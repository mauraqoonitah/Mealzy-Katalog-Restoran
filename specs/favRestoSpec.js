import FavoButtonInitiator from '../src/scripts/utils/favo-button-initiator'

describe('Favorite Restoran', () => {

});

it('harus menampilkan tombol favorite ketika restoran belum di favorite sebelumnya', async() => {
    document.body.innerHTML = '<div id="favoButtonContainer"></div>';
    await FavoButtonInitiator.init({
        favoButtonContainer: document.querySelector('#favoButtonContainer'),
        restaurant: {
            id: 1,
        },


    });

    //  Bila widget-nya digunakan untuk menyukai resto, maka aria-label-nya adalah "your fav resto".
    // Bila widget-nya digunakan untuk batal menyukai resto, maka aria-label-nya adalah "unfav the resto".
    // memeriksa aria label mana yang muncul pada test
    expect(document.querySelector('[aria-label="your fav resto"]'))
        .toBeTruthy();

});

it('tidak menampilkan tombol favorite ketika restoran belum di favorite sebelumnya', async() => {
    document.body.innerHTML = '<div id="favoButtonContainer"></div>';
    await FavoButtonInitiator.init({
        favoButtonContainer: document.querySelector('#favoButtonContainer'),
        restaurant: {
            id: 1,
        },


    });

    //  Bila widget-nya digunakan untuk menyukai resto, maka aria-label-nya adalah "your fav resto".
    // Bila widget-nya digunakan untuk batal menyukai resto, maka aria-label-nya adalah "unfav the resto".
    // memeriksa aria label mana yang muncul pada test
    expect(document.querySelector('[aria-label="unfav the resto"]'))
        .toBeFalsy();

});