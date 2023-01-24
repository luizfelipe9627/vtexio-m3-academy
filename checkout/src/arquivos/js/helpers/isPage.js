/**
 *  Função para verificar se estamos em uma das paginas
 *  que são passadas por argumento
 * @param {array} [varname] um array de strings
 * @return {Boolean} [description]
 */

function isPage() {
    const identificacaoMetaPage = $('meta[name="page"]').prop("content") || "";
    const classTagBody = $("body").attr("class") || "";
    const pageDataLayer =
        typeof dataLayer !== "undefined"
            ? window.dataLayer[0].pageCategory
            : "";

    for (const i in arguments) {
        // resultado-busca na tag body
        if (
            identificacaoMetaPage.search(arguments[i]) >= 0 ||
            pageDataLayer === arguments[i] ||
            classTagBody.search(arguments[i]) >= 0
        )
            return true;
    }
    return false;
}

export default isPage;
