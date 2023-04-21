async function getCategoryData(limit = Infinity) {
    const rows = document.querySelector('tbody').querySelectorAll('tr');
    const categoryData = [];
  
    for (let i = 2; i < rows.length && i < limit + 2; i++) {
      const urlCell = rows[i].querySelector('td:nth-child(9)').querySelector('a')
      if (!urlCell) continue;
      const url = urlCell.href.split('/ref=')[0];
      const newTab = window.open(url, '_blank');
      await new Promise((resolve) => {
        newTab.addEventListener('load', () => {
          resolve();
        });
      });
      const category = newTab.document.querySelector('#wayfinding-breadcrumbs_feature_div');
      if (category) {
        const categoriesText = category.innerText.replace(/\n/g, '').split('›');
        const categories = categoriesText.map((category) => category.trim());
        categoryData.push({ row: i, categories });
      }
      newTab.close();
      window.history.back();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  
    const csvContent = "data:text/csv;charset=utf-8," +
      categoryData.map(({ row, categories }) => `${row},${categories.join(',')}`).join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "category_data.csv");
    document.body.appendChild(link);
    link.click();
  }
  
  getCategoryData(10); // Downloads a CSV file with the category data for the first 10 rows
  



//const rows = document.querySelector('tbody').querySelectorAll('tr')

/* example row content:
<tr style="height: 80px"><th id="950042939R1" style="height: 80px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 80px">2</div></th>
<td class="s1 softmerge" dir="ltr"><div class="softmerge-inner" style="width:97px;left:-1px">113-6875004-2494636</div></td>
<td class="s1" dir="ltr">December 31, 2022</td>
<td class="s1" dir="ltr">$38.35</td>
<td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:97px;left:-1px"><a target="_blank" href="https://www.amazon.com/gp/css/summary/print.html/ref=ppx_od_dt_b_invoice?ie=UTF8&amp;orderID=113-6875004-2494636">https://www.amazon.com/gp/css/summary/print.html/ref=ppx_od_dt_b_invoice?ie=UTF8&amp;orderID=113-6875004-2494636</a></div></td>
<td class="s1" dir="ltr">Yes</td>
<td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:97px;left:-1px"><a target="_blank" href="https://m.media-amazon.com/images/I/41QJHjelliL._SY180_.jpg">https://m.media-amazon.com/images/I/41QJHjelliL._SY180_.jpg</a></div></td>
<td class="s1 softmerge" dir="ltr"><div class="softmerge-inner" style="width:97px;left:-1px">Washinglee 940-0299A USB Console Cable for APC UPS, for AP9630 AP9631 and AP9635 (6 FT/ 1.8M)</div></td>
<td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:195px;left:-1px"><a target="_blank" href="https://www.amazon.com/gp/product/B083DF8KZ7/ref=ppx_yo_dt_b_asin_image_o00_s00?ie=UTF8&amp;psc=1">https://www.amazon.com/gp/product/B083DF8KZ7/ref=ppx_yo_dt_b_asin_image_o00_s00?ie=UTF8&amp;psc=1</a></div></td>
<td class="s1" dir="ltr">B083DF8KZ7</td>
<td class="s3"><div style="width:100px;height:80px;"><img src="https://lh3.googleusercontent.com/docsubipk/AIRpy9PO4gXG1-cGVacvuN9ZQ0h5mrlN8ruCZxOvlmN_CJq6z59ubYJs4yVM4D91Jo4DGxlewupyT8ZdVPSj6GialVTu-nePz-0Qc-ha8qcYxjibGtoHxPB-CRtp9A4Sa2oI=s100-w100-h80" style="width:inherit;height:inherit;object-fit:scale-down;object-position:left bottom;"></div></td>
</tr>
*/