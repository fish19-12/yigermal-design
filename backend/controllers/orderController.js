const Order = require("../models/Order");

const multer = require("multer");

const { storage, cloudinary } = require("../config/cloudinary");

const nodemailer = require("nodemailer");

// ================================
// UPLOAD
// ================================

const upload = multer({
  storage,

  limits: {
    fileSize: 3 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images allowed"));
    }

    cb(null, true);
  },
});

exports.uploadPayment = upload.single("paymentScreenshot");

// ================================
// EMAIL
// ================================

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",

  port: 465,

  secure: true,

  auth: {
    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS,
  },
});

// ================================
// CREATE ORDER
// ================================

exports.createOrder = async (req, res) => {
  try {
    let screenshot = "";

    if (req.file) {
      screenshot = req.file.path;
    }

    const order = await Order.create({
      customer: JSON.parse(req.body.customer),

      items: JSON.parse(req.body.items),

      measurements: JSON.parse(req.body.measurements),

      payment: {
        ...JSON.parse(req.body.payment),

        screenshot,
      },

      total: req.body.total,
    });

    res.status(201).json({
      success: true,

      message: "Fiyorina order received",

      order,
    });

    // EMAIL BACKGROUND

    setImmediate(async () => {
      try {
        await transporter.sendMail({
          from: `"Fiyorina Luxury" <${process.env.EMAIL_USER}>`,

          to: process.env.ADMIN_EMAIL,

          subject: `💎 New Bridal Order - ${order.customer.name}`,

          html: `

<h1>
💎 New Fiyorina Order
</h1>


<h2>
Customer
</h2>


<p>
Name:
${order.customer.name}
</p>


<p>
Phone:
${order.customer.phone}
</p>



<h2>
Total
</h2>


<h1>
${order.total} ETB
</h1>



<a href="${screenshot}">
Payment Screenshot
</a>


`,
        });
      } catch (err) {
        console.log("Email failed", err.message);
      }
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================================
// GET ORDERS
// ================================

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================================
// DELETE ORDER
// ================================

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.payment.screenshot) {
      const publicId = order.payment.screenshot.split("/").pop().split(".")[0];

      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (e) {}
    }

    await Order.deleteOne({
      _id: req.params.id,
    });

    res.json({
      success: true,

      message: "Order deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
