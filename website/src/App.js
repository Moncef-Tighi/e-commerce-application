import React from 'react';

import {Route, Routes} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import Page from './pages/Page'

const Article = React.lazy(() => import('./pages/Article'));
// const FicheArticle = React.lazy(() => import('./pages/FicheArticle'));
// const Commande = React.lazy(() => import('./pages/Commandes'));
// const FicheCommande = React.lazy(() => import('./pages/FicheCommande'));

function App() {

  return (
    <Routes>
      <Route path='' element={<LoginPage />} />
      <Route path='connexion' element={<LoginPage />} />
      <Route element={<Page/>}>
        <Route path='/article' element={<Article />}/>
        {/* <Route path='/article/:code_article' element={<FicheArticle/>}/>
        <Route path='/commande' element={<Commande />}/>
        <Route path='/commande/:id_commande' element={<FicheCommande />}/> */}
      </Route>
      <Route path='*' element={<div>ERREUR 404</div>}/>
    </Routes>
  );
}

export default App;
