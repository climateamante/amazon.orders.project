function next(){
  const next_element = document.querySelector('.a-last').querySelector('a').click()
  nextButton.click();
}

function scrollUp(callback) {
  let currentPosition = window.pageYOffset;
  if (currentPosition > 0) {
    window.scrollTo(0, currentPosition - 100);
    setTimeout(scrollUp, 10);
  }
  // if at the top of the page, then callback
  else {
    create_csv_data()
    next();
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
          order_placed: 'Order Placed',
          order_total: 'Order Total',
          order_item_image: 'Order Invoice URL',
          order_item_title: 'Refund Issued',
          order_item_url: 'Order Item Image URL',
          order_item_id: 'Order Item Title',
          order_invoice_url: 'Order Item Product URL',
          refund: 'Order Item ID',
      };

      // initialize the CSV array with the headers
      const csv = [headers];

      // get all the orders in the HTML
      
      const orders = document.querySelectorAll('.a-box.shipment')
      let items = [];
      // loop through each order and parse the relevant data
      orders.forEach( order => {
          // parse the order number
          const order_number_element = order.parentElement.querySelector('.order-info')
          const regex_order_number = /ORDER # ([\d-]+)/;
          const order_status = order.parentElement.innerText;
      
          // parse the order number using regex_order_number
          const order_number_match = order_status.match(regex_order_number);
          const order_number = order_number_match ? order_number_match[1] : null; 
          
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

          const order_item_element = order
          console.log(`order_item_element: ${order_item_element}`)


          const order_items = order.querySelector('.a-fixed-right-grid-col.a-col-left').querySelector('.a-row')     //order //.children[0].children[1].querySelectorAll('.a-fixed-left-grid-col.yohtmlc-item');
        
          order_items.children.forEach(item => { 

            const item_url = item.querySelector('a').href
            const item_image = item.querySelector('img').src
            const item_id = item_url.match(/product\/([A-Z0-9]+)\/ref/)[1]        
            const item_description = item.querySelector('.a-row').innerText //.innerText //   querySelector('a').innerText
  
                const row = {
                  order_number,
                  order_placed,
                  order_total,
                  order_invoice_url,
                  refund: order_refund,
                  order_item_image: item_image,
                  order_item_title: item_description,
                  order_item_url: item_url,
                  order_item_id: item_id,
              };
  
                items.push({
                  id: item_id,
                  image: item_image,
                  url: item_url,
                  image: item_image,
                  description: item_description,
              });


              let prevOrder = {
                order_number: null,
                order_placed: null,
                order_total: null,
                order_invoice_url: null,
                refund: null
              };
  
              
                  row['order_number'] = order_number || prevOrder.order_number;
                  row['order_placed'] = order_placed || prevOrder.order_placed;
                  row['order_total'] = order_total || prevOrder.order_total;
                  row['order_invoice_url'] = order_invoice_url || prevOrder.order_invoice_url;
                  row['refund'] = order_refund || prevOrder.refund;
              
                  prevOrder = {
                    order_number: row['order_number'],
                    order_placed: row['order_placed'],
                    order_total: row['order_total'],
                    order_invoice_url: row['order_invoice_url'],
                    refund: row['refund']
                  };
          
              
                row['order_item_image'] = item_image;
                row['order_item_title'] = item_description;
                row['order_item_url'] = item_url;
                row['order_item_id'] = item_id;
              
                csv.push(row);
            
              // const uniqueItems = removeDuplicateItems(items);
              console.log(items);

          })
        


           
      })



      // const csvText = csv.map(row => Object.values(row).join(',')).join('\n');

      // Remove duplicate rows from csv
      // const uniqueCsv = removeDuplicates(csv);

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

      // removeDuplicateRows(csv_table)
      /*
      csv.forEach((row) => {
          const tr = document.createElement('tr');
          Object.values(row).forEach((value) => {
              const td = document.createElement('td');
              td.appendChild(document.createTextNode(value));
              tr.appendChild(td);
          });

          csv_table.appendChild(tr);
      });
      */

      //  Log the HTML table to the console
      // Open a new window and write the CSV table HTML to it

      csv_table.deleteRow(0) // remove headers

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