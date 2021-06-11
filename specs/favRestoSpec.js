import FavoButtonInitiator from '../src/scripts/utils/favo-button-initiator';
import FavoriteRestoIdb from '../src/scripts/data/favoriteresto-idb';

describe('Menyukai Restoran', () => {
    const addFavButtonContainer = () => {
        document.body.innerHTML = '<div id="favoButtonContainer"></div>';
    };

    beforeEach(() => {
        addFavButtonContainer();
    });


    it('menampilkan tombol favorite ketika restoran belum di favorite sebelumnya', async() => {
        await FavoButtonInitiator.init({
            favoButtonContainer: document.querySelector('#favoButtonContainer'),
            restaurant: {
                id: 1,
            },
        });

        // memeriksa aria label mana yang muncul pada test
        //  Bila widget-nya digunakan untuk menyukai resto, maka aria-label-nya adalah "your fav resto".
        expect(document.querySelector('[aria-label="your fav resto"]'))
            .toBeTruthy();

    });

    it('tidak menampilkan tombol favorite ketika restoran belum di favorite sebelumnya', async() => {
        await FavoButtonInitiator.init({
            favoButtonContainer: document.querySelector('#favoButtonContainer'),
            restaurant: {
                id: 1,
            },
        });

        // memeriksa aria label mana yang muncul pada test
        // Bila widget-nya digunakan untuk batal menyukai resto, maka aria-label-nya adalah "unfav the resto".
        expect(document.querySelector('[aria-label="unfav the resto"]'))
            .toBeFalsy();

    });

    it('menekan tombol favorite', async() => {
        await FavoButtonInitiator.init({
            favoButtonContainer: document.querySelector('#favoButtonContainer'),
            restaurant: {
                id: 1,
            },
        });

        document.querySelector('#favoButton').dispatchEvent(new Event('click'));
        const resto = await FavoriteRestoIdb.getResto(1);

        expect(resto).toEqual({ id: 1 });

        FavoriteRestoIdb.deleteResto(1);
    });

    it('tidak menambah fav restoran lagi ketika sudah difavoritkan', async() => {
        await FavoButtonInitiator.init({
            favoButtonContainer: document.querySelector('#favoButtonContainer'),
            restaurant: {
                id: 1,
            },
        });

        // Tambahkan restoran dengan ID 1 ke daftar restoran yang disukai
        await FavoriteRestoIdb.putResto({ id: 1 });
        // Simulasikan pengguna menekan tombol fav restoran
        document.querySelector('#favoButton').dispatchEvent(new Event('click'));
        // tidak ada restoran yang dobel
        expect(await FavoriteRestoIdb.getAllRestos()).toEqual([{ id: 1 }]);

        FavoriteRestoIdb.deleteResto(1);
    });

    // menggunakan metode xit, bukan it
    xit('tidak menambahkan restoran favorite ketika dia tidak memiliki id', async() => {
        await FavoButtonInitiator.init({
            favoButtonContainer: document.querySelector('#favoButtonContainer'),
            //kosongkan, karna tidak memiliki id
            restaurant: {},
        });

        document.querySelector('#favoButton').dispatchEvent(new Event('click'));

        expect(await FavoriteRestoIdb.getAllRestos()).toEqual([]);
    });
});