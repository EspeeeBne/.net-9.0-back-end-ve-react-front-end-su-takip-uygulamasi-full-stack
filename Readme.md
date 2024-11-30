#Suyu Çok Severim

Suyu Çok Severim, su tüketiminizi takip etmenizi ve analiz etmenizi sağlayan, React ve .NET Core kullanılarak geliştirilmiş bir uygulamadır. Bu proje sayesinde günlük, haftalık, aylık ve yıllık su içme istatistiklerinizi takip edebilir ve kendinize hedefler koyabilirsiniz.

Özellikler

Kullanıcı kaydı ve giriş sistemi

Günlük, haftalık, aylık ve yıllık su tüketim istatistikleri

İçtiğiniz su miktarına göre grafiksel analizler

Kullanışı kolay ve animasyonlu görünüm

Kurulum

Bu projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz.

Gereksinimler

Node.js ve npm

.NET Core SDK 9.0 ama o kadar 9.0'da yazdım

Adım 1: Depoyu Klonlayın

https://github.com/EspeeeBne/.net-9.0-back-end-ve-react-front-end-su-takip-uygulamasi-full-stack.git

Adım 2: React Bağımlılıklarını Yükleyin ve .env'i ayarlayın.

Projeyi klonladıktan sonra React uygulamasının bağımlıklarını yüklemek için:

cd suyucokseverimfront
npm install

Sonrasında .env.example dosyasını .env yapın port kayıtlı orada başka bir portta açası tutarsa .net'in değiştirin bazen yapıyor öyle muziplik.

Adım 3: .NET Bağımlılıklarını Yükleyin

Backend bağımlıklarını yüklemek için:

cd ../suyucokseverimback
 dotnet restore

Adım 4: Uygulamayı Çalıştırın

Frontend

cd suyucokseverimfront
npm start

Backend

cd suyucokseverimback
dotnet run

Kullanım

Kullanıcı kaydı oluşturun veya mevcut bir hesapla giriş yapın. Ardından su tüketiminizi girerek istatistiklerinizi takip edebilirsiniz. Üstte yer alan kartlara tıkladığınızda grafiksel analizleri görebilirsiniz.

Lisans

Bu proje MIT Lisansı altında lisanslanmıştır.

