import {useState} from 'react'


const useSelection= function(setWarn=null) {

    const [selection, setSelection] = useState({});
    const selectionHandeler = function(event, article) {
        let code_article= article?.GA_CODEARTICLE;
        if (!code_article) code_article = article.code_article;

        if (!event.target.checked) {
            const newSelection = {...selection};
            delete newSelection[code_article]
            return setSelection(newSelection);
        }
        let newArticle= {}
        newArticle[code_article]= article;

        setSelection({
            ...selection,
            ...newArticle
        })
        if (setWarn && Object.keys(selection).length>=20) setWarn("Attention ! Sélectionner plus de 20 articles peut causer des problèmes innatendus durant l'insertion");
        
    }

    const deselectionHadeler= function() {
        setSelection({})
    }

    const removeSelection= function(code_article) {

        const newSelection = selection.filter(art => art.code_article!==code_article);
        setSelection(newSelection);
    }

    return {selection, selectionHandeler, deselectionHadeler, removeSelection}
}

export default useSelection