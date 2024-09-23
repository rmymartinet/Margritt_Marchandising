import cors from "cors";
import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import stripeLib from "stripe";
import originalsRoutes from "./routes/originals.js";

const app = express();
const stripe = stripeLib(process.env.STRIPE_SECRET_KEY);

// Middleware de sécurité
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(express.static("public"));
app.use(express.raw({ type: "application/json" }));

// Limitation de taux
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par fenêtre
});

app.use("/api/", limiter);

// Route pour créer une session Checkout
app.post("/create-checkout-session", async (req, res) => {
  const { amount, productName } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: productName || "Produit sans nom",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["FR"],
      },
      success_url:
        "http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/payment-cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/verify-payment/:sessionId", async (req, res) => {
  const sessionId = req.params.sessionId;
  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);
    if (checkoutSession.payment_status === "paid") {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Utiliser les routes API
app.use("/api/originals", originalsRoutes);

// Lancer le serveur sur le port 4242
app.listen(4242);
