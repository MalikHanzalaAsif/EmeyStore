import axios from 'axios';
import nodemailer from 'nodemailer';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { google } from 'googleapis';


const getAccessToken = async () => {
    try {
        const auth = await axios.post(
            `${process.env.PAYPAL_SANDBOX_API}/v1/oauth2/token`,
            "grant_type=client_credentials",
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                auth: {
                    username: process.env.PAYPAL_SANDBOX_CLIENT_ID,
                    password: process.env.PAYPAL_SANDBOX_SECRET,
                },
            }
        );
        return auth.data.access_token;
    } catch (error) {
        console.error("Failed to get access token:", error.message);
        throw new Error("Unable to fetch PayPal access token. Check your credentials and API URL.");
    }
};

const getOrderDetails = async (orderId, accessToken) => {
    try {
        const response = await axios.get(`${process.env.PAYPAL_SANDBOX_API}/v2/checkout/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to get order details:", error.message);
        throw new Error(`Unable to fetch details for order ID ${orderId}. Check the access token and order ID.`);
    }
};


export const sendEmails = async (formData, user, orderDetails, orderId) => {
    try {
        const OAuth2 = google.auth.OAuth2;
        const oauth2Client = new OAuth2(
            process.env.GMAIL_CLIENT_ID,
            process.env.GMAIL_CLIENT_SECRET,
            process.env.GMAIL_REDIRECT_URI
        );
        oauth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });
        const accessToken = await oauth2Client.getAccessToken();

        const breakdown = orderDetails.purchase_units[0].amount.breakdown || {};

        const sellerReceivableBreakdown = orderDetails.purchase_units[0].payments.captures[0].seller_receivable_breakdown || {};

        const paypalFee = sellerReceivableBreakdown.paypal_fee ? `${sellerReceivableBreakdown.paypal_fee.value} ${sellerReceivableBreakdown.paypal_fee.currency_code}` : "N/A";

        const exchangeRate = sellerReceivableBreakdown.exchange_rate ? `${sellerReceivableBreakdown.exchange_rate.target_currency} to ${sellerReceivableBreakdown.exchange_rate.source_currency} = ${sellerReceivableBreakdown.exchange_rate.value}` : "N/A";

        const grossAmount = sellerReceivableBreakdown.gross_amount ? `${sellerReceivableBreakdown.gross_amount.value} ${sellerReceivableBreakdown.gross_amount.currency_code}` : "N/A";

        const netAmount = sellerReceivableBreakdown.net_amount ? `${sellerReceivableBreakdown.net_amount.value} ${sellerReceivableBreakdown.net_amount.currency_code}` : "N/A";

        const receivableAmount = sellerReceivableBreakdown.receivable_amount ? `${sellerReceivableBreakdown.receivable_amount.value} ${sellerReceivableBreakdown.receivable_amount.currency_code}` : "N/A";

        const shipping = breakdown.shipping ? `${breakdown.shipping.value} ${breakdown.shipping.currency_code}` : "0.00";

        const tax = breakdown.tax_total ? `${breakdown.tax_total.value} ${breakdown.tax_total.currency_code}` : "0.00";

        const discount = breakdown.discount ? `${breakdown.discount}` : "0.00";


        // Set up Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "oauth2",
                user: process.env.FROM_EMAIL,
                clientId: process.env.GMAIL_CLIENT_ID,
                clientSecret: process.env.GMAIL_CLIENT_SECRET,
                refreshToken: process.env.GMAIL_REFRESH_TOKEN,
                accessToken: accessToken.token
            },
        });

        const cartItemsString = orderDetails.purchase_units[0].items.map((item, index) => {
            // Extract size and color from description
            let size = "Not specified";
            let color = "Not specified";

            if (item.description) {
                const parts = item.description.split(","); // Split at ","
                if (parts.length > 1) {
                    color = parts[0].split(":")[1]?.trim() || "Not specified";  // Get value after "Size:"
                    size = parts[1].split(":")[1]?.trim() || "Not specified"; // Get value after "Color:"
                }
            }

            const itemTotal = (item.quantity * Number(item.unit_amount.value)).toFixed(2);
            const itemPrice = Number(item.unit_amount.value).toFixed(2);

            return `
                <div style="margin-bottom: 15px; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
                    <h4 style="color: #2980B9;">ITEM ${index + 1}: ${item.name}</h4>
                    <p><strong>Size:</strong> ${size}</p>
                    <p><strong>Color:</strong> ${color}</p>
                    <p><strong>Quantity:</strong> ${item.quantity || 1}</p>
                    <p><strong>Price:</strong> ${itemPrice} ${item.unit_amount.currency_code}</p>
                    <p><strong>Total:</strong> ${itemTotal} ${item.unit_amount.currency_code}</p>
                </div>
            `;
        }).join("");




        // Construct the email
        const ownerMailOptions = {
            from: process.env.FROM_EMAIL,
            to: process.env.TO_EMAIL,
            subject: "New Order on Emey's Store",
            html: `
                <html>
                <body style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="text-align: center; color: #2C3E50;">New Order Details</h2>
                    
                    <div style="margin: 20px; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
                        <h3 style="color: #2980B9;">Customer Given Details</h3>
                        <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
                        <p><strong>Email:</strong> ${formData.email}</p>
                        <p><strong>Phone:</strong> ${formData.phone}</p>
                        <p><strong>Address:</strong> ${formData.address || "Not Provided"}</p>
                        <p><strong>City:</strong> ${formData.city || "Not Provided"}</p>
                        <p><strong>State:</strong> ${formData.state || "Not Provided"}</p>
                        <p><strong>Zip Code:</strong> ${formData.zipCode || "Not Provided"}</p>
                    </div>
                    
                    <div style="margin: 20px; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
                        <h3 style="color: #2980B9;">Emey Store Profile</h3>
                        <p><strong>Name:</strong> ${user.name}</p>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>ID:</strong> ${user.id}</p>
                    </div>
                    
                    <div style="margin: 20px; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
                        <h3 style="color: #2980B9;">Order Details</h3>
                        <p><strong>Order ID:</strong> ${orderId}</p>
                        <p><strong>Total:</strong> ${orderDetails.purchase_units[0].amount.value} ${orderDetails.purchase_units[0].amount.currency_code}</p>
                        <p><strong>PayPal Fee:</strong> ${paypalFee}</p>
                        <p><strong>Shipping:</strong> ${shipping}</p>
                        <p><strong>Tax:</strong> ${tax}</p>
                        <p><strong>Discount:</strong> ${discount}</p>
                        <p><strong>Exchange Rate:</strong> ${exchangeRate}</p>
                        <p><strong>Gross Amount:</strong> ${grossAmount}</p>
                        <p><strong>Net Amount:</strong> ${netAmount}</p>
                        <p><strong>Receivable Amount:</strong> ${receivableAmount}</p>
                    </div>
                    
                    <div style="margin: 20px; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
                        <h3 style="color: #2980B9;">Cart Items</h3>
                        <pre>${cartItemsString}</pre>
                    </div>
        
                    <div style="margin: 20px; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
                        <h3 style="color: #2980B9;">Customer PayPal Account Details</h3>
                        <p><strong>Name:</strong> ${orderDetails.payer.name.given_name} ${orderDetails.payer.name.surname}</p>
                        <p><strong>Email:</strong> ${orderDetails.payer.email_address}</p>
                        <p><strong>Address:</strong> ${orderDetails.purchase_units[0].shipping.address.address_line_1 || "Not Provided"}</p>
                        <p><strong>City:</strong> ${orderDetails.purchase_units[0].shipping.address.admin_area_2 || "Not Provided"}</p>
                        <p><strong>State:</strong> ${orderDetails.purchase_units[0].shipping.address.admin_area_1 || "Not Provided"}</p>
                        <p><strong>Zip Code:</strong> ${orderDetails.purchase_units[0].shipping.address.postal_code || "Not Provided"}</p>
                        <p><strong>Country:</strong> ${orderDetails.purchase_units[0].shipping.address.country_code || "Not Provided"}</p>
                    </div>
        
                    <div style="margin: 20px; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
                        <h3 style="color: #2980B9;">Additional Info</h3>
                        <p><strong>Order Time:</strong> ${orderDetails.create_time}</p>
                    </div>
        
                </body>
                </html>
            `,
        };


        const ownerInfo = await transporter.sendMail(ownerMailOptions);
        console.log("Email sent successfully to owner:", ownerInfo.response);

        const userMailOptions = {
            from: process.env.FROM_EMAIL,
            to: user.email,
            subject: "Order Placed Successfully on Emey's Store",
            html: `
                <html>
                <body style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px;">
                    <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #ddd; max-width: 600px; margin: 0 auto;">
                        <h2 style="text-align: center; color: #2980B9;">Thank You for Your Purchase!</h2>
                        <p style="font-size: 16px;">Dear ${user.name} (${formData.firstName} ${formData?.lastName}),</p>
                        <p style="font-size: 16px;">Thank you for shopping with Emey's Store! Your order has been placed successfully.</p>
                        <p style="font-size: 16px;"><strong>Order ID:</strong> ${orderId}</p>
                        <p style="font-size: 16px;">You can check your PayPal account for more details about your order. If you have any questions, feel free to reach out to us.</p>
                        <p style="font-size: 16px;">Thanks for choosing Emey's Store. We hope to see you again soon!</p>
                        <p style="font-size: 16px; text-align: center;">Best regards, <br />The Emey's Store Team</p>
                    </div>
                </body>
                </html>
            `,
        };

        if (user.email === formData.email) {
            // Send email asynchronously
            const userInfo = await transporter.sendMail(userMailOptions);
            console.log("Email sent successfully to user:", userInfo.response);
        } else {
            const userMailOptions2 = {
                from: process.env.FROM_EMAIL,
                to: formData.email,
                subject: "Order Placed Successfully on Emey's Store",
                html: `
                    <html>
                    <body style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px;">
                        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #ddd; max-width: 600px; margin: 0 auto;">
                            <h2 style="text-align: center; color: #2980B9;">Thank You for Your Purchase!</h2>
                            <p style="font-size: 16px;">Dear ${user.name} (${formData.firstName} ${formData?.lastName}),</p>
                            <p style="font-size: 16px;">Thank you for shopping with Emey's Store! Your order has been placed successfully.</p>
                            <p style="font-size: 16px;"><strong>Order ID:</strong> ${orderId}</p>
                            <p style="font-size: 16px;">You can check your PayPal account for more details about your order. If you have any questions, feel free to reach out to us.</p>
                            <p style="font-size: 16px;">Thanks for choosing Emey's Store. We hope to see you again soon!</p>
                            <p style="font-size: 16px; text-align: center;">Best regards, <br />The Emey's Store Team</p>
                        </div>
                    </body>
                    </html>
                `,
            };

            // Send email asynchronously
            const userInfo = await transporter.sendMail(userMailOptions);
            console.log("Email sent successfully to first user:", userInfo.response);
            // Send email asynchronously
            const userInfo2 = await transporter.sendMail(userMailOptions2);
            console.log("Email sent successfully to second user:", userInfo2.response);
        }
    } catch (error) {
        console.error("Failed to send emails:", error);
        throw error;
    };
};

export const verifyPayment = async (req, res) => {
    const { orderId, formData } = req.body;
    const user = req.user;
    try {
        const accessToken = await getAccessToken();
        const orderDetails = await getOrderDetails(orderId, accessToken);
        if (orderDetails.status === "COMPLETED") {
            console.log(`order completed by ${user.name}`);
            res.json({ message: "Payment verified.", type: "success", orderDetails });
            await sendEmails(formData, user, orderDetails, orderId);
            try {
                const userObj = await User.findOne({ _id: user.id });
                const orderObject = {
                    userId: userObj._id,
                    orderId: orderDetails.id,
                    createdAt: orderDetails.create_time,
                    price: orderDetails.purchase_units[0].amount.value
                }
                const newOrder = new Order(orderObject);
                await newOrder.save();
                console.log("new order saved!");
            } catch (err) {
                console.log("error while saving order:", err);
            }
        } else {
            console.log("order is not verified")
            return res.status(400).json({ type: "error", message: "Payment not completed." });
        }
    } catch (error) {
        console.error("Failed to verify payment:", error);
        return res.status(500).send("Failed to verify payment");
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        if (orders.length === 0) {
            return res.json({ type: "default", message: "orders not found!" });
        }
        return res.json({ type: "success", orders: orders });
    } catch (err) {
        console.log("can't get orders!", err);
        return res.status(500).send("can't get orders!");
    }
}