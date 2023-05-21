const router = require("express").Router();

// controller
const Product = require("../controller/productController");

// middleware
const Authentication = require("../middlewares/authenticate");
const Uploader = require("../middlewares/uploader");
const checkRole = require("../middlewares/checkRole");
const checkOwnership = require("../middlewares/checkCredentials");

router.get("/", Product.findAllProducts);
router.post("/", Uploader.single("image"), Product.createProduct);
router.get("/search", Product.searchProduct);
router.get("/ownership", Product.findProductsByOwnership);
router.get("/:id", Product.findProductById);
router.put("/:id", Uploader.single("image"), Product.updateProduct);
router.delete("/:id", Product.deleteProduct);

module.exports = router;
