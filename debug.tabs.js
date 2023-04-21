

function getCategoryData(limit = Infinity) {
    const rows = document.querySelector('tbody').querySelectorAll('tr');
    const categoryData = [];
    const urls = []

    for (let i = 2; i < rows.length && i < limit + 2; i++) {
      const urlCell = rows[i].querySelector('td:nth-child(9)').querySelector('a')
      if (!urlCell) continue
      urls.push(urlCell.href.split('/ref=')[0])
    //   const url = urlCell.href.split('/ref=')[0];
    //   const newTab = window.open(url, '_blank');
    }
    return urls
}

urls = getCategoryData(1)

  /*

    const category = newTab.document.querySelector('#wayfinding-breadcrumbs_feature_div');
      if (category) {
        const categoriesText = category.innerText.replace(/\n/g, '').split('›');
        const categories = categoriesText.map((category) => category.trim());
        categoryData.push({ row: i, categories });
      }
      newTab.close();
      window.history.back();
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
    const csvContent = "data:text/csv;charset=utf-8," +
      categoryData.map(({ row, categories }) => `${row},${categories.join(',')}`).join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "category_data.csv");
    document.body.appendChild(link);
    link.click();
  }
  */
  
  
