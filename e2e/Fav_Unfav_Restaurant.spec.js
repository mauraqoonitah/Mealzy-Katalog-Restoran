Feature('Fav Unfav Restaurant');

Before(({ I }) => {
    // Buka halaman utama
    I.amOnPage('/');
});

Scenario('Fav dan Unfav Restoran', ({ I }) => {
    // cek data 
    I.see('List Restoran', 'h2');

    // Pilih salah satu resto, misalnya resto pertama
    I.seeElement('h3.text-center.hovering a');

    // Click resto tersebut
    I.click(locate('h3.text-center.hovering a').first());

    // Aplikasi membawa kita ke halaman detail resto
    // Menekan tombol menyukai resto
    I.seeElement('#favoButton');
    I.click('#favoButton');

    // Buka halaman resto favorite
    I.amOnPage('/#/favorite');
    //Melihat resto yang telah disukai
    I.seeElement('.resto-item');

    // Pilih salah satu resto, misalnya resto pertama
    I.seeElement('h3.text-center.hovering a');
    I.click(locate('h3.text-center.hovering a').first());

    // Pilih batal menyukai restoran
    I.seeElement('#favoButton');
    I.click("#favoButton");

    // Buka halaman favorite
    I.amOnPage('/#/favorite');

    // Memastikan sudah tidak ada restoran yang disukai
    I.seeElement('.favresto-content-not-found');

});