$('table.article-table').find('img[alt^=Weapon]').each(function() {
    console.log($(this).attr('src'))
})
