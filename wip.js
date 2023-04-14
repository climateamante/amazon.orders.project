function scrollUp(callback) {
    let currentPosition = window.pageYOffset;
    if (currentPosition > 0) {
      window.scrollTo(0, currentPosition - 100);
      setTimeout(scrollUp, 10);
    }
    // if at the top of the page, then callback
    else {
      create_csv_data()
    }

  }

function scrollToBottom(callback) {
    window.scrollTo(0, document.body.scrollHeight);

    setTimeout(() => {},2000);

  
    const images = document.querySelectorAll("img");
    let loadedCount = 0;
  
    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        scrollUp();
      }
    };
  
    images.forEach((image) => {
      if (image.complete) {
        checkLoaded();
      } else {
        image.addEventListener("load", checkLoaded);
        image.addEventListener("error", checkLoaded);
      }
    });
  }
    
  
function create_csv_data(){

        // define the headers for the CSV object
        const headers = {
            order_number: 'Order Number',
            order_total: 'Order Total',
            order_item_image: 'Order Item Image URL',
            order_item_title: 'Order Item Title',
            order_item_url: 'Order Item URL',
            order_item_id: 'Order Item ID',
            order_invoice_url: 'Order Invoice URL',
            refund: 'Refund Issued',
        };

        // initialize the CSV array with the headers
        const csv = [headers];

        // get all the orders in the HTML
        const orders = document.querySelectorAll('.a-box-group .shipment');

        // loop through each order and parse the relevant data
        orders.forEach((order) => {
            // parse the order number
            const order_number_element = order.querySelector('.a-text-bold');
            const regex_order_number = /ORDER # ([\d-]+)/;
            const order_status = order.parentElement.innerText;
            /*
            'ORDER PLACED\nDecember 31, 2022\nTOTAL\n$38.35\nSHIP TO\nResearch Ranks\nORDER # 113-6875004-2494636\nView order details  View invoice\nReturn complete\nYour return is complete. Your refund has been issued. When will I get my refund? \nWashinglee 940-0299A USB Console Cable for APC UPS, for AP9630 AP9631 and AP9635 (6 FT/ 1.8M)\nBuy it again\n \nView your item\nRS232 DB9 Female to Stereo 2.5mm Plug Cable for gluco Meter Radio Programming Cable (DB9#3)\nBuy it again\n \nView your item\n\t\nView return/refund status\nWrite a product review\n\t\nArchive order'
            */
            // parse the order number using regex_order_number
            const order_number_match = order_status.match(regex_order_number);
            const order_number = order_number_match ? order_number_match[1] : null; 

            /*
            <ul class="a-unordered-list a-nostyle a-vertical"><a class="a-link-normal yohtmlc-order-details-link" href="/gp/your-account/order-details/ref=ppx_yo_dt_b_order_details_o00?ie=UTF8&amp;orderID=113-6875004-2494636">View order details</a><i class="a-icon a-icon-text-separator" role="img"></i><a class="a-link-normal" href="/gp/css/summary/print.html/ref=ppx_yo_dt_b_invoice_o00?ie=UTF8&amp;orderID=113-6875004-2494636">View invoice</a></ul>
            */
            
            const order_details_url = order.parentElement.querySelector('.a-link-normal.yohtmlc-order-details-link').href;
            const order_invoice_url = `https://www.amazon.com/gp/css/summary/print.html/ref=ppx_od_dt_b_invoice?ie=UTF8&orderID=${order_number}`

            const order_placed = order_status.match(/ORDER PLACED\n(.+)\n/)[1]
            const order_total = order_status.match(/TOTAL\n(.+)\n/)[1]
            const order_refund = (order_status.match(/Your refund has been issued/)) ? 'Yes' : 'No';
            
            console.log(`order_number: ${order_number}`)
            console.log(`order_placed: ${order_placed}`)
            console.log(`order_total: ${order_total}`)
            console.log(`order_refund: ${order_refund}`)
            console.log(`order_details_url: ${order_details_url}`)
            console.log(`order_invoice_url: ${order_invoice_url}`)
        
            /*
            <div class="a-fixed-left-grid a-spacing-base"><div class="a-fixed-left-grid-inner" style="padding-left:100px"><div class="a-text-center a-fixed-left-grid-col a-col-left" style="width:100px;margin-left:-100px;float:left;"><div class="item-view-left-col-inner"><a class="a-link-normal" href="/gp/product/B083DF8KZ7/ref=ppx_yo_dt_b_asin_image_o00_s00?ie=UTF8&amp;psc=1"><img alt="" src="https://m.media-amazon.com/images/I/41QJHjelliL._SY180_.jpg" aria-hidden="true" onload="" class="yo-critical-feature" height="90" width="90" title="Washinglee 940-0299A USB Console Cable for APC UPS, for AP9630 AP9631 and AP9635 (6 FT/ 1.8M)" data-a-hires="https://m.media-amazon.com/images/I/41QJHjelliL._SY180_.jpg" data-already-flushed-csm="true"></a></div></div><div class="a-fixed-left-grid-col yohtmlc-item a-col-right" style="padding-left:1.5%;float:left;"><div class="a-row"><a class="a-link-normal" href="/gp/product/B083DF8KZ7/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&amp;psc=1">Washinglee 940-0299A USB Console Cable for APC UPS, for AP9630 AP9631 and AP9635 (6 FT/ 1.8M)</a></div><div class="a-row"><span class="a-size-small"></span></div><div class="a-row"><span class="a-color-secondary a-text-bold"></span><span class="a-color-secondary"></span></div><div class="a-row"><div class="a-row a-spacing-top-mini"><span class="a-declarative" data-action="bia_button" data-bia_button="{}"><span class="a-button a-spacing-mini a-button-primary yohtmlc-buy-it-again" id="a-autoid-3"><span class="a-button-inner"><a href="/gp/buyagain/ref=ppx_yo_dt_b_bia?ie=UTF8&amp;ats=eyJjdXN0b21lcklkIjoiQTJFVkJIWjhHU1BNQVoiLCJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDgz%0AREY4S1o3In0%3D%0A" aria-label="Buy it again" class="a-button-text" role="button" id="a-autoid-3-announce"><div class="reorder-modal-trigger-text"><i class="reorder-modal-trigger-icon"></i>Buy it again</div></a></span></span>
        </span><span class="a-button a-spacing-mini a-button-base" id="a-autoid-4"><span class="a-button-inner"><a href="/your-orders/pop/ref=ppx_yo_dt_b_pop?_encoding=UTF8&amp;gen=canonical&amp;lineItemId=oorgtrmopjoronykljqon43046201&amp;orderId=113-6875004-2494636&amp;packageId=1&amp;returnSummaryId=35T%2BGEsoPsRWJcmtxLqRBw&amp;returnUnitIndices=1&amp;returnUnitMappingId=7276752670988%231&amp;shipmentId=Mhjknzy8P" class="a-button-text" role="button" id="a-autoid-4-announce">View your item
        </a></span></span></div></div></div></div></div>
            */

            const order_item_element = order.querySelector('.a-fixed-left-grid.a-spacing-base');
            //const order_item_image = order_item_element.querySelector('img').src;
            console.log(`order_item_element: ${order_item_element}`)


            const order_items = order.children[0].children[1].querySelectorAll('.a-fixed-left-grid-col.yohtmlc-item');
            const items = [];

            order_items.forEach((item) => {
                const item_url = item.children[0].querySelector('a').href
                const item_image = item.parentElement.querySelector('img').src
                const item_id = item_url.match(/product\/([A-Z0-9]+)\/ref/)[1]        
                const item_description = item.children[0].querySelector('a').innerText

                const row = {
                    order_number,
                    order_total,
                    order_item_image: item_image,
                    order_item_title: item_description,
                    order_item_url: item_url,
                    order_item_id: item_id,
                    order_invoice_url,
                    refund: order_refund,
                };


                items.push({
                    id: item_id,
                    image: item_image,
                    url: item_url,
                    image: item_image,
                    description: item_description,
                });

        
                
            
            });

            items.forEach((item, index) => {
                const row = {};
                row['order_number'] = index === 0 ? order_number : null;
                row['order_total'] = index === 0 ? order_total : null;
                row['order_item_image'] = item.image;
                row['order_item_title'] = item.description;
                row['order_item_url'] = item.url;
                row['order_item_id'] = item.id;
                row['order_invoice_url'] = index === 0 ? order_invoice_url : null;
                row['refund'] = index === 0 ? order_refund : null;
            
                csv.push(row);
            });

            console.log(items);
        });


        // const csvText = csv.map(row => Object.values(row).join(',')).join('\n');



        // Convert the CSV data to an HTML table
        const csv_table = document.createElement('table');
        let table_html = '<tr>';

        // Add the table headers
        Object.values(headers).forEach((header) => {
            table_html += `<th>${header}</th>`;
        });

        table_html += '</tr>';
        // csv.shift(); // Remove the headers (only needed after the first page of results)
        // Add the table rows
        csv.forEach((row) => {
            const tr = document.createElement('tr');
            Object.values(row).forEach((value) => {
                const td = document.createElement('td');
                td.appendChild(document.createTextNode(value));
                tr.appendChild(td);
            });

            csv_table.appendChild(tr);
        });

        //  Log the HTML table to the console
        // Open a new window and write the CSV table HTML to it


        const popup = window.open('', '_blank');
        popup.document.write(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>CSV Table</title>
                <style>
                    table, th, td {
                        border: 1px solid black;
                        border-collapse: collapse;
                    }
                    th, td {
                        padding: 5px;
                        text-align: left;
                    }
                </style>
            </head>
            <body>
                ${csv_table.outerHTML}
            </body>
        </html>
        `);
        popup.document.close();
  
}


scrollToBottom();