const invoiceTemplate=(invoiceNumber,clientName,clientEmail,Qty,Price,Total,subTotal,copun,deliveryCharge)=>{
    return `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Invoice</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px;">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#2563eb; padding:20px; color:#ffffff;">
              <h2 style="margin:0;">INVOICE</h2>
              <p style="margin:5px 0 0;">Invoice #${invoiceNumber}</p>
            </td>
          </tr>

          <!-- Client Info -->
          <tr>
            <td style="padding:20px;">
              <table width="100%">
                <tr>
                  <td>
                    <strong>Billed To:</strong><br/>
                    ${clientName}<br/>
                    ${clientEmail}
                  </td>
                  <td align="right">
                    <strong>Invoice Date:</strong> {{INVOICE_DATE}}<br/>
                    <strong>Due Date:</strong> {{DUE_DATE}}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Invoice Table -->
          <tr>
            <td style="padding:0 20px;">
              <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;">
                <tr style="background:#f1f5f9;">
                  <th align="left">Description</th>
                  <th align="center">Qty</th>
                  <th align="right">Price</th>
                  <th align="right">Total</th>
                </tr>

                <tr>
                  <td>Product Invoice</td>
                  <td align="center">${Qty}</td>
                  <td align="right">${Price}</td>
                  <td align="right">${Total}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Total -->
          <tr>
            <td style="padding:20px;">
              <table width="100%">
                <tr>
                  <td align="right">
                    <strong>Copun:</strong> -${copun}<br/>
                    <strong>Delivery Charge:</strong> +${deliveryCharge}<br/>
                    <strong>Subtotal:</strong> ${subTotal}<br/>
                    <strong style="font-size:18px;">Total: ${subTotal}</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Payment Info -->
          <tr>
            <td style="padding:20px; background:#f9fafb;">
              <strong>Payment Method:</strong><br/>
              Bank Transfer<br/>
              Bank: BRAC Bank<br/>
              Account Name: Rj Raj<br/>
              Account No: 1234567890
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px; text-align:center; font-size:13px; color:#6b7280;">
              Thank you Mr.${clientName} 🙏<br/>
              Cloud Snap | Mern-Stack Developer<br/>
              support@cloudsnap.com | +88012345678
            </td>
          </tr>

        </table>
        <!-- End Container -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}
module.exports=invoiceTemplate