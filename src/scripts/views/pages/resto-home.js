import RestoDbSource from '../../data/restodb-source';
import {
    createRestoItemTemplate,
    createSkeletonRestoTemplate,
} from '../templates/template-creator';

const RestoHome = {
    async render() {
        return `
        <div class="jumbotron">
        <picture>

        <source media="(max-width: 600px)" srcset="./images/hero-image_2-large.jpg">
        <source media="(max-width: 600px)" srcset="./images/hero-image_2-small.jpg">

          <img 
          src="./images/hero-image_2-large.jpg" alt="hero small"
          </img>

        </picture>
            <div class="hero">
                <h1  class="hero-title">Mealzy</h1>
                <p class="hero-tag">mau makan dimana hari ini?</p>
            </div>
         </div>
    
        <div class="content">
            <h2 class="heading" tabindex="0" >List Restoran</h2>
            <p class="text-center text-grey"  tabindex="0"><i>Coba rekomendasi dari kami, nih.</i></p>
        
            <div id="restos" class="restos">
            ${createSkeletonRestoTemplate(20)}
            </div>
        </div>

        `;
    },

    async afterRender() {
        const resto = await RestoDbSource.homeResto();
        const restoContainer = document.querySelector('#restos');
        restoContainer.innerHTML = '';
        resto.forEach((restaurants) => {
            restoContainer.innerHTML += createRestoItemTemplate(restaurants);
        });
    },

};

export default RestoHome;