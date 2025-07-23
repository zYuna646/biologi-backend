import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Question,
  QuestionType,
  CognitiveLevel,
} from '../entities/question.entity';

@Injectable()
export class QuestionsSeederService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  async seedAllQuestions(): Promise<void> {
    // Check for existing questions to prevent duplicates
    const existingQuestions = await this.questionsRepository.find();
    const existingQuestionNumbers = new Set(
      existingQuestions.map(q => q.question_number)
    );

    const questions = [
      // Question 1-13: Multiple Choice (PG)
      {
        question_number: 1,
        question_text: `Perhatikan tahapan proses spermatogenesis berikut:
• Spermatogonium membelah secara mitosis membentuk spermatosit primer.
• Spermatosit primer membelah secara meiosis I menghasilkan dua spermatosit sekunder.
• Spermatosit sekunder membelah secara meiosis II menjadi spermatid.
• Spermatid mengalami diferensiasi menjadi sel sperma (spermatozoa) yang matang.

Jika terjadi gangguan pada tahap meiosis II, maka proses spermatogenesis akan terganggu pada bagian...`,
        question_type: QuestionType.PG,
        cognitive_level: CognitiveLevel.C2,
        weight: 1,
        score: 13,
        options: [
          'A. Pembentukan spermatosit primer',
          'B. Pembentukan spermatid',
          'C. Pemasakan sperma (spermatozoa)',
          'D. Pembentukan spermatogonium',
        ],
        correct_answer: 'B',
      },
      {
        question_number: 2,
        question_text:
          'Apa akibat utama yang terjadi pada proses pembuahan jika tuba falopi mengalami penyumbatan?',
        question_type: QuestionType.PG,
        cognitive_level: CognitiveLevel.C2,
        weight: 1,
        score: 1,
        options: [
          'A. Ovum tidak dapat dibuahi karena tidak bertemu dengan sperma',
          'B. Ovum tetap dapat bertemu dengan sperma di ovarium dan mengalami pembuahan',
          'C. Ovum akan bergerak ke uterus dan mati tanpa dibuahi',
          'D. Tidak terjadi gangguan karena pembuahan bisa terjadi di uterus',
        ],
        correct_answer: 'A',
      },
      {
        question_number: 3,
        question_text: `Proses spermatogenesis melibatkan beberapa tahapan pembentukan sel dari spermatogonium hingga menjadi sel sperma (spermatozoa). Spermatogonium merupakan sel awal yang mengalami pembelahan, sedangkan spermatid merupakan hasil akhir pembelahan sebelum diferensiasi menjadi sperma.

Analisislah perbedaan fungsi antara spermatogonium dan spermatid berdasarkan peran keduanya dalam spermatogenesis!`,
        question_type: QuestionType.PG,
        cognitive_level: CognitiveLevel.C4,
        weight: 1,
        score: 1,
        options: [
          'A. Spermatid akan mengalami pembelahan mitosis lanjutan untuk menghasilkan spermatogonium baru sebagai bagian dari siklus reproduksi yang berlangsung terus-menerus pada pria sejak pubertas hingga tua.',
          'B. Spermatogonium berperan sebagai sel induk pembentuk spermatosit melalui pembelahan, sedangkan spermatid merupakan hasil akhir dari meiosis yang akan mengalami diferensiasi menjadi spermatozoa fungsional.',
          'C. Spermatid bertanggung jawab terhadap produksi hormon reproduksi pria, sedangkan spermatogonium hanya berfungsi sebagai sel pendukung pada dinding tubulus seminiferus dalam testis.',
          'D. Spermatogonium dan spermatid memiliki struktur dan fungsi yang identik karena keduanya berperan langsung dalam proses pembuahan dan perkembangan embrio sejak awal.',
        ],
        correct_answer: 'B',
      },
      {
        question_number: 4,
        question_text: `Infeksi saluran reproduksi yang terjadi secara berulang dapat menimbulkan peradangan kronis pada organ-organ reproduksi. Kondisi ini sering kali tidak segera ditangani, sehingga menimbulkan kerusakan pada jaringan yang berperan dalam proses reproduksi.

Berdasarkan uraian tersebut, analisislah bagaimana infeksi saluran reproduksi yang tidak ditangani dengan baik dapat menyebabkan gangguan kesuburan!`,
        question_type: QuestionType.PG,
        cognitive_level: CognitiveLevel.C4,
        weight: 1,
        score: 1,
        options: [
          'A. Infeksi yang terjadi terus-menerus dapat merusak jaringan pada organ reproduksi, sehingga mengganggu fungsi reproduksi dan menyebabkan infertilitas',
          'B. Infeksi hanya menimbulkan rasa tidak nyaman tanpa berdampak pada kemampuan memiliki keturunan',
          'C. Infeksi meningkatkan hormon kesuburan sehingga tidak berdampak buruk pada sistem reproduksi',
          'D. Infeksi hanya berdampak sementara dan tidak memengaruhi struktur organ reproduksi secara permanen',
        ],
        correct_answer: 'A',
      },
      {
        question_number: 5,
        question_text: `Dalam proses oogenesis, satu sel induk (oogonium) hanya menghasilkan satu ovum fungsional dan tiga badan polar yang akhirnya akan terdegradasi. Meskipun tampak tidak efisien karena hanya satu sel yang berguna, proses ini tetap berlangsung secara alami pada manusia.

Analisilah mengapa proses pembentukan badan polar tetap terjadi dalam oogenesis manusia!`,
        question_type: QuestionType.PG,
        cognitive_level: CognitiveLevel.C4,
        weight: 1,
        score: 1,
        options: [
          'A. Untuk memastikan ovum yang terbentuk memiliki sitoplasma dan nutrisi yang cukup untuk perkembangan awal embrio',
          'B. Untuk mencegah terjadinya mutasi genetik selama proses pembelahan meiosis',
          'C. Untuk menghasilkan cadangan sel telur tambahan dalam satu siklus',
          'D. Untuk mengurangi kemungkinan terjadinya kehamilan kembar dalam satu ovulasi',
        ],
        correct_answer: 'A',
      },
      {
        question_number: 6,
        question_text: `Gonore adalah salah satu penyakit infeksi menular seksual yang menyerang jaringan pada sistem reproduksi manusia. Jika tidak segera diobati, penyakit ini dapat menimbulkan komplikasi serius.

Apa potensi bahaya gonore terhadap fungsi sistem reproduksi jika tidak diobati!`,
        question_type: QuestionType.PG,
        cognitive_level: CognitiveLevel.C2,
        weight: 1,
        score: 1,
        options: [
          'A. Tidak berbahaya karena tubuh dapat menyembuhkannya secara alami',
          'B. Dapat merusak saluran reproduksi seperti tuba falopi dan vas deferens sehingga berisiko menyebabkan infertilitas',
          'C. Menyebabkan peningkatan aktivitas hormon reproduksi',
          'D. Hanya berdampak pada kulit dan tidak memengaruhi organ reproduksi secara langsung',
        ],
        correct_answer: 'B',
      },
      {
        question_number: 7,
        question_text:
          'Mengapa spermatogenesis terus berlangsung sepanjang hidup pria, sedangkan oogenesis tidak?',
        question_type: QuestionType.PG,
        cognitive_level: CognitiveLevel.C2,
        weight: 1,
        score: 1,
        options: [
          'A. Karena pria menghasilkan hormon estrogen dalam jumlah besar setelah pubertas, yang merangsang pembentukan sperma secara terus-menerus hingga lanjut usia tanpa henti.',
          'B. Karena spermatogonium, yaitu sel induk sperma pada pria, tetap aktif dan melakukan pembelahan mitosis secara berkala setelah pubertas, sehingga memungkinkan produksi sperma berlangsung seumur hidup.',
          'C. Karena testis memiliki kemampuan khusus untuk menyimpan ovum seperti ovarium, sehingga mampu mempertahankan cadangan sel kelamin sepanjang usia reproduktif pria.',
          'D. Karena proses spermatogenesis tidak melibatkan pembelahan mitosis, sehingga tidak ada batasan usia terhadap pembentukan sperma baru secara alami.',
        ],
        correct_answer: 'B',
      },
      {
        question_number: 8,
        question_text:
          'Apa dampak terhadap proses reproduksi pria jika fungsi epididimis terganggu?',
        question_type: QuestionType.PG,
        cognitive_level: CognitiveLevel.C2,
        weight: 1,
        score: 1,
        options: [
          'A. Tidak terjadi pembentukan hormon',
          'B. Tidak terjadi penyimpanan dan pematangan sperma',
          'C. Tidak ada spermatogonium',
          'D. Tidak terbentuk cairan semen',
        ],
        correct_answer: 'B',
      },
      {
        question_number: 9,
        question_text:
          'Mengapa saluran tuba falopi menjadi lokasi utama terjadinya proses fertilisasi pada manusia dengan mempertimbangkan jalur pergerakan ovum dan sperma!',
        question_type: QuestionType.PG,
        cognitive_level: CognitiveLevel.C2,
        weight: 1,
        score: 1,
        options: [
          'A. Karena saluran tuba falopi berada di antara ovarium dan uterus, sehingga menjadi titik pertemuan antara ovum dan sperma pada waktu yang tepat',
          'B. Karena dinding tuba falopi cukup tebal untuk menjaga suhu sel telur tetap stabil',
          'C. Karena tuba falopi langsung terhubung ke rahim, tempat zigot tumbuh',
          'D. Karena tidak ada pengaruh hormon di tuba falopi yang dapat mengganggu proses fertilisasi',
        ],
        correct_answer: 'A',
      },
      {
        question_number: 10,
        question_text:
          'Seorang remaja perempuan mengalami nyeri hebat saat menstruasi, siklus haid yang tidak teratur, serta perdarahan berlebihan setiap kali menstruasi. Gejala ini berlangsung selama beberapa bulan dan mengganggu aktivitas sehari-hari. Berdasarkan kondisi tersebut, tindakan evaluatif yang paling tepat untuk dilakukan adalah...',
        question_type: QuestionType.PG,
        cognitive_level: CognitiveLevel.C5,
        weight: 1,
        score: 1,
        options: [
          'A. Mengabaikan gejala tersebut karena dianggap sebagai bagian normal dari masa remaja',
          'B. Segera berkonsultasi ke dokter untuk pemeriksaan dan penanganan lebih lanjut',
          'C. Mengonsumsi obat pereda nyeri yang tersedia tanpa resep dokter',
          'D. Menghentikan seluruh aktivitas fisik selama menstruasi berlangsung',
        ],
        correct_answer: 'B',
      },
      {
        question_number: 11,
        question_text:
          'Seorang wanita mengalami gangguan pada fase pembelahan meiosis II selama proses oogenesis. Pada tahap ini, ovum seharusnya menyelesaikan pembelahan akhir untuk menjadi sel matang. Apa dampak yang terjadi terhadap proses oogenesis akibat gangguan pada tahap tersebut?',
        question_type: QuestionType.PG,
        cognitive_level: CognitiveLevel.C4,
        weight: 1,
        score: 1,
        options: [
          'A. Tidak terbentuk ovum matang yang siap untuk dibuahi',
          'B. Tidak terbentuk badan polar pertama',
          'C. Ovum yang terbentuk akan membelah menjadi dua ovum baru',
          'D. Sel telur tidak akan dilepaskan dari ovarium',
        ],
        correct_answer: 'A',
      },
      {
        question_number: 12,
        question_text:
          'Seorang siswa mempelajari proses spermatogenesis dan mengetahui bahwa proses tersebut terdiri dari beberapa tahapan, termasuk pembentukan spermatosit sekunder melalui pembelahan meiosis I. Jika terjadi gangguan pada tahap pembentukan spermatosit sekunder, maka dampak yang terjadi adalah…',
        question_type: QuestionType.PG,
        cognitive_level: CognitiveLevel.C2,
        weight: 1,
        score: 1,
        options: [
          'A. Testosteron tidak diproduksi',
          'B. Sperma yang terbentuk tidak memiliki kepala',
          'C. Spermatid tidak terbentuk karena proses pembelahan tidak berlanjut',
          'D. Oosit gagal dibuahi karena tidak ada pembuahan',
        ],
        correct_answer: 'C',
      },
      {
        question_number: 13,
        question_text:
          'Dalam proses oogenesis, jika oosit sekunder tidak mengalami pembuahan oleh sperma, maka tahap selanjutnya yang terjadi adalah …',
        question_type: QuestionType.PG,
        cognitive_level: CognitiveLevel.C3,
        weight: 1,
        score: 1,
        options: [
          'A. Melanjutkan meiosis II',
          'B. Berubah menjadi zigot',
          'C. Mengalami degenerasi dan luruh bersama menstruasi',
          'D. Berubah menjadi korpus luteum',
        ],
        correct_answer: 'C',
      },

      // Questions 14-18: Complex Multiple Choice (PGK)
      {
        question_number: 14,
        question_text: `Berilah tanda centang (✓) pada pernyataan tepat/benar dan tanda silang (X) untuk pernyataan salah
Perhatikan organ-organ berikut ini yang termasuk dalam sistem reproduksi laki-laki:
• Testis
• Vas deferens
• Uretra
• Ovarium
• Epidermis`,
        question_type: QuestionType.PGK,
        cognitive_level: CognitiveLevel.C2,
        weight: 5,
        score: 1,
        options: ['Testis', 'Vas deferens', 'Uretra', 'Ovarium', 'Epidermis'],
        correct_answer: ['A', 'B', 'C', 'E'],
      },
      {
        question_number: 15,
        question_text: `Manakah dari pernyataan berikut yang menunjukkan fungsi dari organ reproduksi perempuan? Jawablah dengan benar!
• Ovarium menghasilkan ovum dan hormon estrogen
• Uterus sebagai tempat perkembangan embrio
• Tuba fallopi sebagai tempat fertilisasi terjadi
• Vagina menghasilkan sel telur
• Serviks menghubungkan rahim dengan vagina`,
        question_type: QuestionType.PGK,
        cognitive_level: CognitiveLevel.C2,
        weight: 5,
        score: 20,
        options: [
          'Ovarium menghasilkan ovum dan hormon estrogen',
          'Uterus sebagai tempat perkembangan embrio',
          'Tuba fallopi sebagai tempat fertilisasi terjadi',
          'Vagina menghasilkan sel telur',
          'Serviks menghubungkan rahim dengan vagina',
        ],
        correct_answer: ['A', 'B', 'C', 'E'],
      },
      {
        question_number: 16,
        question_text: `Manakah dari penyakit berikut ini yang merupakan gangguan pada sistem reproduksi?
• Gonore
• Infertilitas
• Diabetes melitus
• HIV/AIDS
• TBC`,
        question_type: QuestionType.PGK,
        cognitive_level: CognitiveLevel.C3,
        weight: 5,
        score: 1,
        options: [
          'Gonore',
          'Infertilitas',
          'Diabetes melitus',
          'HIV/AIDS',
          'TBC',
        ],
        correct_answer: ['A', 'B', 'D'],
      },
      {
        question_number: 17,
        question_text: `Manakah dari pernyataan berikut yang benar mengenai oogenesis?
• Oogenesis dimulai sejak janin perempuan masih dalam kandungan
• Oogenesis menghasilkan satu ovum fungsional dan tiga badan polar
• Meiosis II pada oogenesis akan selesai tanpa fertilisasi
• Proses oogenesis terjadi di ovarium
• Hormon progesteron memicu pembentukan ovum`,
        question_type: QuestionType.PGK,
        cognitive_level: CognitiveLevel.C2,
        weight: 5,
        score: 1,
        options: [
          'Oogenesis dimulai sejak janin perempuan masih dalam kandungan',
          'Oogenesis menghasilkan satu ovum fungsional dan tiga badan polar',
          'Meiosis II pada oogenesis akan selesai tanpa fertilisasi',
          'Proses oogenesis terjadi di ovarium',
          'Hormon progesteron memicu pembentukan ovum',
        ],
        correct_answer: ['A', 'B', 'D'],
      },
      {
        question_number: 18,
        question_text: `Perhatikan pernyataan berikut tentang spermatogenesis?
• Spermatogenesis terjadi di dalam tubulus seminiferus
• Spermatosit primer membelah secara mitosis menghasilkan spermatid
• Spermatogenesis menghasilkan empat sperma fungsional dari satu spermatogonium
• Sel sperma bersifat diploid
• Proses ini dipicu oleh hormon testosteron`,
        question_type: QuestionType.PGK,
        cognitive_level: CognitiveLevel.C2,
        weight: 5,
        score: 1,
        options: [
          'Spermatogenesis terjadi di dalam tubulus seminiferus',
          'Spermatosit primer membelah secara mitosis menghasilkan spermatid',
          'Spermatogenesis menghasilkan empat sperma fungsional dari satu spermatogonium',
          'Sel sperma bersifat diploid',
          'Proses ini dipicu oleh hormon testosteron',
        ],
        correct_answer: ['A', 'C', 'E'],
      },

      // Questions 19-23: Matching (M)
      {
        question_number: 19,
        question_text: `Jodohkan pernyataan pada bagian A dengan jawaban yang tepat pada bagian B.
Bagian A:
1. Testis
2. Ovarium
3. Uterus
4. Vagina
5. Penis

Bagian B:
A. Menghasilkan sel telur dan hormon estrogen
B. Tempat spermatogenesis berlangsung
C. Saluran keluarnya bayi saat melahirkan
D. Tempat tumbuh dan berkembangnya janin
E. Alat kopulasi dan saluran keluarnya sperma
F. Mengatur suhu optimal untuk produksi sperma`,
        question_type: QuestionType.M,
        cognitive_level: CognitiveLevel.C2,
        weight: 5,
        score: 1,
        options: null,
        correct_answer: ['1-B', '2-A', '3-D', '4-C', '5-E'],
        matching_pairs: {
          Testis: 'Tempat spermatogenesis berlangsung',
          Ovarium: 'Menghasilkan sel telur dan hormon estrogen',
          Uterus: 'Tempat tumbuh dan berkembangnya janin',
          Vagina: 'Saluran keluarnya bayi saat melahirkan',
          Penis: 'Alat kopulasi dan saluran keluarnya sperma',
        },
      },
      {
        question_number: 20,
        question_text: `Perhatikan gambar organ dan proses sistem reproduksi manusia berikut. Jodohkan masing-masing gambar dengan fungsi, proses, yang sesuai!

Kolom A:
1. Spermatogenesis
2. Oogenesis
3. Testis
4. Tuba Falopi

Kolom B:
A. Struktur tempat produksi sperma dan hormon testosterone
B. Tempat terjadinya fertilisasi dan penyaluran ovum ke uterus
C. Proses pembentukan sel kelamin jantan secara meiosis dan maturasi
D. Proses yang hanya menghasilkan satu gamet fungsional karena pembelahan sitoplasma tidak merata`,
        question_type: QuestionType.M,
        cognitive_level: CognitiveLevel.C2,
        weight: 5,
        score: 20,
        options: null,
        correct_answer: ['1-C', '2-D', '3-A', '4-B'],
        matching_pairs: {
          Spermatogenesis:
            'Proses pembentukan sel kelamin jantan secara meiosis dan maturasi',
          Oogenesis:
            'Proses yang hanya menghasilkan satu gamet fungsional karena pembelahan sitoplasma tidak merata',
          Testis: 'Struktur tempat produksi sperma dan hormon testosterone',
          'Tuba Falopi':
            'Tempat terjadinya fertilisasi dan penyaluran ovum ke uterus',
        },
      },
      {
        question_number: 21,
        question_text: `Jodohkan pernyataan pada bagian A dengan jawaban yang tepat pada bagian B.
Bagian A:
1. Oosit primer
2. Oosit sekunder
3. Badan polar
4. Ovum

Bagian B:
A. Sel haploid yang siap ovulasi
B. Produk pembelahan yang tidak berkembang
C. Mengalami pembelahan mitosis membentuk zigot
D. Sel yang mengalami meiosis pertama
E. Hasil akhir oogenesis yang fungsional`,
        question_type: QuestionType.M,
        cognitive_level: CognitiveLevel.C3,
        weight: 5,
        score: 1,
        options: null,
        correct_answer: ['1-D', '2-A', '3-B', '4-E'],
        matching_pairs: {
          'Oosit primer': 'Sel yang mengalami meiosis pertama',
          'Oosit sekunder': 'Sel haploid yang siap ovulasi',
          'Badan polar': 'Produk pembelahan yang tidak berkembang',
          Ovum: 'Hasil akhir oogenesis yang fungsional',
        },
      },
      {
        question_number: 22,
        question_text: `Jodohkan pernyataan pada bagian A dengan jawaban yang tepat pada bagian B.
Bagian A:
1. HIV
2. Herpes Genital
3. Infertilitas
4. Klamidia

Bagian B:
A. Infeksi bakteri yang sering tidak bergejala tapi dapat menyebabkan kerusakan tuba falopi
B. Gangguan hormon yang menyebabkan menstruasi tidak teratur
C. Ketidakmampuan jangka panjang untuk hamil setelah 1 tahun hubungan seksual tanpa pengaman
D. Penyakit virus yang menyebabkan luka terbuka di area genital dan bisa kambuh berulang
E. Virus yang menyerang sistem imun dan meningkatkan risiko infeksi oportunistik`,
        question_type: QuestionType.M,
        cognitive_level: CognitiveLevel.C5,
        weight: 5,
        score: 1,
        options: null,
        correct_answer: ['1-E', '2-D', '3-C', '4-A'],
        matching_pairs: {
          HIV: 'Virus yang menyerang sistem imun dan meningkatkan risiko infeksi oportunistik',
          'Herpes Genital':
            'Penyakit virus yang menyebabkan luka terbuka di area genital dan bisa kambuh berulang',
          Infertilitas:
            'Ketidakmampuan jangka panjang untuk hamil setelah 1 tahun hubungan seksual tanpa pengaman',
          Klamidia:
            'Infeksi bakteri yang sering tidak bergejala tapi dapat menyebabkan kerusakan tuba falopi',
        },
      },
      {
        question_number: 23,
        question_text: `Pasangkan masing-masing kasus gangguan/kelainan pada Kolom A dengan solusi preventif atau tindakan kolaboratif yang paling tepat di Kolom B!
Bagian A:
1. Siswa di kelas malu membicarakan isu menstruasi dan reproduksi
2. Banyak siswa menyalahartikan tanda-tanda keputihan sebagai hal wajar
3. Temuan bahwa banyak siswa tidak mengetahui bahaya HIV/AIDS
4. Rendahnya pengetahuan siswa tentang pentingnya menjaga organ reproduksi

Bagian B:
A. Membuat video kampanye tentang pentingnya kebersihan organ reproduksi
B. Merancang program peer-education berbasis kerja kelompok
C. Menyusun informasi gangguan reproduksi berbasis hasil riset kelompok
D. Membentuk kelompok diskusi untuk membangun pemahaman gender-sensitive
E. Program edukasi komprehensif tentang kesehatan reproduksi`,
        question_type: QuestionType.M,
        cognitive_level: CognitiveLevel.C5,
        weight: 5,
        score: 1,
        options: null,
        correct_answer: ['1-D', '2-C', '3-B', '4-A'],
        matching_pairs: {
          'Siswa di kelas malu membicarakan isu menstruasi dan reproduksi':
            'Membentuk kelompok diskusi untuk membangun pemahaman gender-sensitive',
          'Banyak siswa menyalahartikan tanda-tanda keputihan sebagai hal wajar':
            'Menyusun informasi gangguan reproduksi berbasis hasil riset kelompok',
          'Temuan bahwa banyak siswa tidak mengetahui bahaya HIV/AIDS':
            'Merancang program peer-education berbasis kerja kelompok',
          'Rendahnya pengetahuan siswa tentang pentingnya menjaga organ reproduksi':
            'Membuat video kampanye tentang pentingnya kebersihan organ reproduksi',
        },
      },

      // Questions 24-30: Short Answer (IS)
      {
        question_number: 24,
        question_text:
          'Dalam proses spermatogenesis, spermatosit sekunder akan mengalami pembelahan meiosis II. Sel apa yang terbentuk setelah tahap ini selesai?',
        question_type: QuestionType.IS,
        cognitive_level: CognitiveLevel.C1,
        weight: 1,
        score: 1,
        options: null,
        correct_answer: 'Spermatid',
        matching_pairs: null,
      },
      {
        question_number: 25,
        question_text:
          'Organ apakah yang berfungsi memproduksi sel sperma dan hormon testosteron pada laki-laki?',
        question_type: QuestionType.IS,
        cognitive_level: CognitiveLevel.C1,
        weight: 1,
        score: 7,
        options: null,
        correct_answer: 'Testis',
        matching_pairs: null,
      },
      {
        question_number: 26,
        question_text:
          'Spermatogenesis merupakan proses pembentukan sel sperma yang berlangsung di dalam testis. Di bagian manakah proses ini terjadi secara spesifik?',
        question_type: QuestionType.IS,
        cognitive_level: CognitiveLevel.C1,
        weight: 1,
        score: 1,
        options: null,
        correct_answer: 'Tubulus seminiferus',
        matching_pairs: null,
      },
      {
        question_number: 27,
        question_text:
          'Jelaskan secara singkat mengapa oogenesis hanya menghasilkan satu ovum fungsional!',
        question_type: QuestionType.IS,
        cognitive_level: CognitiveLevel.C3,
        weight: 1,
        score: 1,
        options: null,
        correct_answer:
          'Untuk memastikan ovum mendapat cukup sitoplasma dan nutrisi.',
        matching_pairs: null,
      },
      {
        question_number: 28,
        question_text:
          'Dalam proses oogenesis, satu oosit primer mengalami pembelahan meiosis. Berapa jumlah sel ovum fungsional yang dihasilkan dari satu oosit primer?',
        question_type: QuestionType.IS,
        cognitive_level: CognitiveLevel.C6,
        weight: 1,
        score: 1,
        options: null,
        correct_answer: 'satu',
        matching_pairs: null,
      },
      {
        question_number: 29,
        question_text:
          'Apa nama saluran yang menghubungkan ovarium dengan uterus?',
        question_type: QuestionType.IS,
        cognitive_level: CognitiveLevel.C2,
        weight: 1,
        score: 1,
        options: null,
        correct_answer: 'Tuba falopi',
        matching_pairs: null,
      },
      {
        question_number: 30,
        question_text:
          'Pada fase apa oogenesis dimulai dalam kehidupan seorang perempuan?',
        question_type: QuestionType.IS,
        cognitive_level: CognitiveLevel.C2,
        weight: 1,
        score: 1,
        options: null,
        correct_answer: 'fase embrio',
        matching_pairs: null,
      },

      // Questions 31-35: Essay (U)
      {
        question_number: 31,
        question_text:
          'Struktur sistem reproduksi pria dan wanita memiliki perbedaan yang dirancang untuk saling mendukung dalam proses pembuahan. Ketika salah satu bagian dari sistem tersebut mengalami gangguan fungsi, keberhasilan pembuahan dapat terhambat. Bagaimana perbedaan struktur reproduksi pria dan wanita berkontribusi terhadap keberhasilan pembuahan, dan apa akibat fungsional yang dapat terjadi jika salah satu struktur tidak bekerja dengan optimal?',
        question_type: QuestionType.U,
        cognitive_level: CognitiveLevel.C4,
        weight: 5,
        score: 1,
        options: null,
        correct_answer:
          'Jawaban essay mengenai perbedaan struktur reproduksi dan kontribusinya terhadap pembuahan',
        matching_pairs: null,
      },
      {
        question_number: 32,
        question_text:
          'Analisislah setiap tahap dalam proses spermatogenesis, lalu identifikasi kemungkinan gangguan yang dapat terjadi di masing-masing tahap dan bagaimana gangguan tersebut dapat memengaruhi hasil akhir sperma!',
        question_type: QuestionType.U,
        cognitive_level: CognitiveLevel.C4,
        weight: 5,
        score: 25,
        options: null,
        correct_answer:
          'Jawaban essay mengenai analisis tahap spermatogenesis dan kemungkinan gangguannya',
        matching_pairs: null,
      },
      {
        question_number: 33,
        question_text:
          'Proses oogenesis dan spermatogenesis memiliki perbedaan dalam hal lokasi berlangsungnya, hasil akhir yang dihasilkan, serta waktu terjadinya sepanjang hidup manusia. Bagaimana perbedaan karakteristik kedua proses tersebut dilihat dari hasil akhir, dan waktu berlangsungnya proses tersebut?',
        question_type: QuestionType.U,
        cognitive_level: CognitiveLevel.C4,
        weight: 5,
        score: 1,
        options: null,
        correct_answer:
          'Jawaban essay mengenai perbedaan karakteristik oogenesis dan spermatogenesis',
        matching_pairs: null,
      },
      {
        question_number: 34,
        question_text:
          'Ovarium dan testis merupakan organ utama dalam sistem reproduksi yang juga berperan sebagai penghasil hormon. Bagaimana peran kedua organ tersebut dalam fungsi reproduksi manusia, dan apa keterkaitannya dengan hormon yang masing-masing hasilkan?',
        question_type: QuestionType.U,
        cognitive_level: CognitiveLevel.C4,
        weight: 5,
        score: 1,
        options: null,
        correct_answer:
          'Jawaban essay mengenai peran ovarium dan testis dalam fungsi reproduksi',
        matching_pairs: null,
      },
      {
        question_number: 35,
        question_text:
          'Rendahnya kesadaran siswa tentang pentingnya menjaga kesehatan reproduksi dan hubungan di luar nikah. Apa saja faktor yang memengaruhi rendahnya kesadaran siswa dalam menjaga organ reproduksi, dan jenis kegiatan edukatif apa yang paling sesuai untuk mengatasi masalah tersebut di lingkungan sekolahmu? Sertakan alasan pemilihannya.',
        question_type: QuestionType.U,
        cognitive_level: CognitiveLevel.C6,
        weight: 5,
        score: 1,
        options: null,
        correct_answer:
          'Jawaban essay mengenai faktor-faktor kesadaran kesehatan reproduksi dan solusi edukatif',
        matching_pairs: null,
      },
    ];

    for (const questionData of questions) {
      // Skip if question number already exists
      if (existingQuestionNumbers.has(questionData.question_number)) {
        console.log(
          `Skipping question number ${questionData.question_number} as it already exists.`,
        );
        continue;
      }

      const question = this.questionsRepository.create(questionData);
      await this.questionsRepository.save(question);
    }

    console.log('Successfully seeded 35 questions from KISI KISI document');
  }
}
