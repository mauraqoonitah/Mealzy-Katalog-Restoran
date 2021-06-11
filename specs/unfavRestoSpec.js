import FavoButtonInitiator from '../src/scripts/utils/favo-button-initiator';
import FavoriteRestoIdb from '../src/scripts/data/favoriteresto-idb';

const addFavButtonContainer = () => {
    document.body.innerHTML = '<div id="favoButtonContainer"></div>';
};

describe('Batal Menyukai Restoran', () => {

    beforeEach(async() => {
        addFavButtonContainer();
        await FavoriteRestoIdb.putResto({ id: 1 });
    });
    // setelah tiap metode tes dijalankan, hapus restoran id 1 dari daftar
    afterEach(async() => {
        await FavoriteRestoIdb.deleteResto(1);
    });

    it('bisa menampilkan tombol batal favorite ketika restoran sudah di favorite sebelumnya', async() => {
        await FavoButtonInitiator.init({
            favoButtonContainer: document.querySelector('#favoButtonContainer'),
            restaurant: {
                id: 1,
            },
        });

        expect(document.querySelector('[aria-label="unfav the resto"]')).toBeTruthy();
    });

    it('tidak menampilkan tombol batal favorite ketika restoran sudah di favorite sebelumnya', async() => {
        await FavoButtonInitiator.init({
            favoButtonContainer: document.querySelector('#favoButtonContainer'),
            restaurant: {
                id: 1,
            },
        });

        expect(document.querySelector('[aria-label="your fav resto"]')).toBeFalsy();
    });

    // menguji restoran dihapus dari daftar resto yang disukai ketika widget-nya ditekan
    it('bisa menghapus favorit restoran dari list', async() => {
        await FavoButtonInitiator.init({
            favoButtonContainer: document.querySelector('#favoButtonContainer'),
            restaurant: {
                id: 1,
            },
        });

        document.querySelector('[aria-label="unfav the resto"]').dispatchEvent(new Event('click'));

        expect(await FavoriteRestoIdb.getAllRestos()).toEqual([]);
    });

    // membatalkan resto yang disukai ketika resto tersebut tidak ada di dalam daftar 
    it('tidak boleh error jika restoran yang tidak disukai tidak ada dalam daftar', async() => {
        await FavoButtonInitiator.init({
            favoButtonContainer: document.querySelector('#favoButtonContainer'),
            restaurant: {
                id: 1,
            },
        });

        // hapus restoran dari daftar fav resto
        await FavoriteRestoIdb.deleteResto(1);

        // simulasi pengguna menakan tombol batal menyukai resto
        document.querySelector('[aria-label="unfav the resto"]').dispatchEvent(new Event('click'));

        expect(await FavoriteRestoIdb.getAllRestos()).toEqual([]);
    });


});