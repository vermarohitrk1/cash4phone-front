// Download a Base64-encoded file

export function downloadBase64File (base64Data, filename, index, record) {
    var element = document.createElement('a')
    element.setAttribute('href', base64Data)
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    // element.click()
    document.body.removeChild(element)

    
    // const barcodeImage = document.getElementById(`barcode${index}`);
            // Create a div to hold both the order number and the barcode
            const container = document.createElement("div");
            container.setAttribute('style', 'text-ailgn:center;width:300px;')
            // Create a paragraph for the order number
            const orderNumber = document.createElement("h2");
            orderNumber.textContent = `${record.order_num}`; 
            const phoneModel = document.createElement("h3");
            phoneModel.textContent = `${record.brand} ${record.model}`;// Replace with your order number field name
            
            const barcodeImg = document.createElement("img");
            barcodeImg.setAttribute('src', base64Data)
            container.appendChild(orderNumber);
            container.appendChild(phoneModel);
            container.appendChild(barcodeImg);
            // Create a new window for printing
            const printWindow = window.open("", "", "width=600,height=400");
            printWindow.document.write(`
            <html>
              <head>
                <style>
                  /* Add CSS styling for the label content here */
                  body {
                    margin: 0;
                    padding: 0;
                  }
                  .label {
                    max-width: 38.1mm;
                    max-height: 22.2mm;
                    margin-rigth: 3.2mm;
                    /* Add other styling for the label container here */
                  }
                  .outer{
                    display:flex;
                    margin: 1.6mm;
                  }
                </style>
              </head>
              <body>
                <div class="outer">
                    <div class="label">
                        <div class="template" style="text-align:center;">
                            <h4 style="text-align:center;margin:0;">${record.order_num}</h4>
                            <p style="text-align:center;margin:0;font-size:16px;font-weight:bold;">${record.brand} ${record.model}</p>
                            <!-- Add the barcode image here -->
                            <img src="${base64Data}" style="width: 30mm;" alt="Barcode" />
                        </div>
                    </div>
                    <div class="label">
                        <div class="template">
                            <h4 style="text-align:center;margin:0;">${record.order_num}</h4>
                            <p style="text-align:center;margin:0;font-size:14px;font-weight:bold;">${record.brand} ${record.model}</p>
                            <!-- Add the barcode image here -->
                            <img src="${base64Data}" style="width:100%" alt="Barcode" />
                        </div>
                    </div>
                </div>
              </body>
            </html>
          `);
          
            printWindow.document.close();
            // Write the container HTML to the print window
            //printWindow.document.body.appendChild(container);
            
            // Call the print function to open the print dialog
            printWindow.print();
            
            // Close the print window after printing
            printWindow.close();
}
