import axios from 'axios';
import nodemailer from 'nodemailer';

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


        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.FROM_EMAIL,
                pass: process.env.FROM_EMAIL_PASS,
            },
        });

        // Generate a dynamic string for all cart items, including size
        const cartItemsString = orderDetails.purchase_units[0].items.map((item, index) => {
            // Extract size and color using string methods
            let size = "Not specified";
            let color = "Not specified";

            if (item.description) {
                const parts = item.description.split(","); // Split at ","

                if (parts.length > 1) {
                    size = parts[0].split(":")[1].trim();  // Get value after "Size:"
                    color = parts[1].split(":")[1].trim(); // Get value after "Color:"
                }
            }

            return `
                ITEM ${index + 1}:
                - Name: ${item.name}
                - Size: ${size}
                - Color: ${color}
                - Quantity: ${item.quantity || 1}
                - Price: ${Number(item.unit_amount.value).toFixed(2)} ${item.unit_amount.currency_code}
                - Total: ${(item.quantity * Number(item.unit_amount.value)).toFixed(2)} ${item.unit_amount.currency_code}
            `;
        }).join("\n");



        // Construct the email
        const ownerMailOptions = {
            from: process.env.FROM_EMAIL,
            to: process.env.TO_EMAIL,
            subject: "New Order on Emey's Store",
            text: `
                -------- CUSTOMER DETAILS --------
                NAME: ${orderDetails.payer.name.given_name} ${orderDetails.payer.name.surname}
                EMAIL: ${orderDetails.payer.email_address}
                PHONE: ${formData.phone}
                ADDRESS: ${formData.address || "Not Provided"}
                CITY: ${formData.city || "Not Provided"}
                STATE: ${formData.state || "Not Provided"}
                ZIP CODE: ${formData.zipCode || "Not Provided"}
                
                -------- EMEY STORE PROFILE DETAILS --------
                NAME: ${user.name}
                EMAIL: ${user.email}
                ID: ${user.id}

                -------- ORDER DETAILS --------
                ORDER ID: ${orderId}
                TOTAL: ${orderDetails.purchase_units[0].amount.value} ${orderDetails.purchase_units[0].amount.currency_code}
                PAYPAL FEE: ${paypalFee}
                SHIPPING: ${shipping} 
                TAX: ${tax} 
                DISCOUNT: ${discount}
                EXCHNAGE RATE: ${exchangeRate}
                GROSS AMOUNT: ${grossAmount}
                NET AMOUNT: ${netAmount}
                FINAL AMOUNT RECEIVED: ${receivableAmount}

                
                CART ITEMS:
                ${cartItemsString}
                
                -------- CUSTOMER PAYPAL ACCOUNT DETAILS --------
                ADDRESS: ${orderDetails.purchase_units[0].shipping.address.address_line_1 || "Not Provided"}
                CITY: ${orderDetails.purchase_units[0].shipping.address.admin_area_2 || "Not Provided"}
                STATE: ${orderDetails.purchase_units[0].shipping.address.admin_area_1 || "Not Provided"}
                ZIP CODE: ${orderDetails.purchase_units[0].shipping.address.postal_code || "Not Provided"}
                COUNTRY: ${orderDetails.purchase_units[0].shipping.address.country_code || "Not Provided"}
                
                -------- ADDITIONAL INFO --------
                ORDER TIME: ${orderDetails.create_time}
            `,
        };

        const ownerInfo = await transporter.sendMail(ownerMailOptions);
        console.log("Email sent successfully to owner:", ownerInfo.response);

        const userMailOptions = {
            from: process.env.FROM_EMAIL,
            to: user.email,
            subject: "Order placed succesfully on Emey's Store",
            text: `Dear ${user.name}/${formData.firstName} ${formData?.lastName}!
             Thank you for your purchase. 
             Your order has been placed successfully.
             Your order ID is ${orderId}. 
             Check your paypal account for more details. 
             if you have any queries feel free to reach us. Thanks!`
        };
        if (user.email === formData.email) {
            // Send email asynchronously
            const userInfo = await transporter.sendMail(userMailOptions);
            console.log("Email sent successfully to user:", userInfo.response);
        } else {
            const userMailOptions2 = {
                from: process.env.FROM_EMAIL,
                to: formData.email,
                subject: "Order placed succesfully on Emey's Store",
                text: `Dear ${user.name}/${formData.firstName} ${formData?.lastName}! Thank you for your purchase. Your order has been placed successfully. Your order ID is ${orderId}. Check your paypal account for more details. if you have any queries feel free to reach us. Thanks!`
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
            res.json({ message: "Payment verified.", type: "success", orderDetails });
            await sendEmails(formData, user, orderDetails, orderId);
            console.log("order completed by user");
        } else {
            return res.status(400).json({ type: "error", message: "Payment not completed." });
        }
    } catch (error) {
        console.error("Failed to verify payment:", error);
        return res.status(500).send("Failed to verify payment");
    }
};