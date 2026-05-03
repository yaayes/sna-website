<?php

namespace Database\Seeders;

use App\Models\Representant;
use Illuminate\Database\Seeder;

class RepresentantSeeder extends Seeder
{
    public function run(): void
    {
        $representatives = [
            [
                'sort_order' => 1,
                'department_code' => '06',
                'department_name' => 'Alpes-Maritimes',
                'first_name' => 'Magali',
                'last_name' => 'BRATINA',
                'role' => 'Représentante départementale',
                'short_bio' => 'Professionnelle expérimentée du secteur médico-social, Magali BRATINA dispose de plus de 16 années d\'expérience en gestion multi-sites, développement d\'activité et management d\'équipes. Elle évolue en lien étroit avec les acteurs du secteur (SAMSAH, PEP, etc.) et porte la conviction que les aidants occupent une place centrale dans les parcours de vie, sans pour autant bénéficier d\'une reconnaissance à la hauteur de leur rôle.',
                'photo_path' => null,
                'is_active' => true,
            ],
            [
                'sort_order' => 2,
                'department_code' => '29',
                'department_name' => 'Finistère',
                'first_name' => 'Laurent',
                'last_name' => 'MANCHON',
                'role' => 'Représentant départemental',
                'short_bio' => 'Aidant familial, professionnel du médico-social et acteur engagé de terrain, Laurent MANCHON dispose d\'une double légitimité issue de l\'expérience vécue et d\'une expertise professionnelle structurée. Fondateur et président de l\'Association des Aidants Familiaux du Finistère, il est également auteur de « De l\'ombre à la lumière – Témoignage d\'un aidant ».',
                'photo_path' => '/images/representants/laurent-manchon.jpg',
                'is_active' => true,
            ],
            [
                'sort_order' => 3,
                'department_code' => '35',
                'department_name' => 'Ille-et-Vilaine',
                'first_name' => 'Éloïse',
                'last_name' => 'MANDIN',
                'role' => 'Représentante départementale',
                'short_bio' => 'Accompagnante de transition de vie et animatrice d\'ateliers en résidences seniors, Éloïse MANDIN est fondatrice de Ecout\'&Sens. Elle développe une approche centrée sur l\'accompagnement humain, le bien-être et la gestion des transitions de vie, avec plus de 10 ans d\'expérience en gestion administrative et relationnelle.',
                'photo_path' => '/images/representants/eloise-mandin.jpg',
                'is_active' => true,
            ],
            [
                'sort_order' => 4,
                'department_code' => '38',
                'department_name' => 'Isère',
                'first_name' => 'Dallal',
                'last_name' => 'BOUDOUDOU',
                'role' => 'Représentante départementale',
                'short_bio' => 'Professionnelle du secteur bancaire et directrice adjointe en agence en ligne, Dallal BOUDOUDOU dispose d\'une expérience solide en gestion de clientèle et management. Également aidante familiale, mère d\'une enfant atteinte d\'une maladie rare, elle apporte une approche ancrée dans le vécu et tournée vers des solutions concrètes.',
                'photo_path' => '/images/representants/dallal-boudoudou.jpg',
                'is_active' => true,
            ],
            [
                'sort_order' => 5,
                'department_code' => '54',
                'department_name' => 'Meurthe-et-Moselle',
                'first_name' => 'Aurélien',
                'last_name' => 'SCHALLER',
                'role' => 'Représentant départemental',
                'short_bio' => 'Fonctionnaire territorial engagé dans le service public depuis plus de 20 ans, Aurélien SCHALLER dispose d\'une solide expérience à l\'interface des enjeux opérationnels, humains et institutionnels. Aidant familial et acteur syndical (CFE-CGC, FA-FPT), son ancrage territorial et sa maîtrise du dialogue social constituent des atouts opérationnels pour le SNA.',
                'photo_path' => '/images/representants/aurelien-schaller.jpg',
                'is_active' => true,
            ],
            [
                'sort_order' => 6,
                'department_code' => '69',
                'department_name' => 'Rhône',
                'first_name' => 'Hakim',
                'last_name' => 'KECILI',
                'role' => 'Représentant départemental',
                'short_bio' => 'Parent aidant engagé, Hakim KECILI développe une approche fondée sur l\'entraide, la transmission et l\'accompagnement des familles confrontées au handicap. Volontaire lors des Jeux paralympiques 2024, son ancrage dans le vécu et sa proximité avec les réalités de terrain constituent des atouts pour le SNA dans le Rhône.',
                'photo_path' => null,
                'is_active' => true,
            ],
            [
                'sort_order' => 7,
                'department_code' => '75',
                'department_name' => 'Paris',
                'first_name' => 'Margaux',
                'last_name' => 'MENEYROL',
                'role' => 'Représentante départementale',
                'short_bio' => 'Formée en sciences politiques et en droit, Margaux MENEYROL dispose d\'une expertise approfondie des politiques publiques. Ancienne collaboratrice du cabinet du préfet de Seine-Saint-Denis et de la représentation permanente de la France à l\'UE, elle est fondatrice de Rien à CARE, une fabrique d\'idées dédiée à la reconnaissance des aidants.',
                'photo_path' => null,
                'is_active' => true,
            ],
            [
                'sort_order' => 8,
                'department_code' => '78',
                'department_name' => 'Yvelines',
                'first_name' => 'Yasmina',
                'last_name' => 'ZREIKI',
                'role' => 'Représentante départementale',
                'short_bio' => 'Consultante en coordination de parcours de soins et spécialiste du droit des usagers, Yasmina ZREIKI intervient à l\'interface des acteurs institutionnels, sanitaires et judiciaires. Aidante familiale, elle apporte une double expertise technique et vécue au service des aidants des Yvelines.',
                'photo_path' => null,
                'is_active' => true,
            ],
            [
                'sort_order' => 9,
                'department_code' => '85',
                'department_name' => 'Vendée',
                'first_name' => 'Elvina',
                'last_name' => 'CHAUVIN',
                'role' => 'Représentante départementale',
                'short_bio' => 'Chargée de développement des actions associatives au sein d\'APF France handicap, Elvina CHAUVIN accompagne les personnes en situation de handicap et leurs proches. Aidante familiale et mère d\'un enfant atteint d\'une pathologie rare, son expertise du secteur et sa capacité de mobilisation constituent des atouts pour le SNA en Vendée.',
                'photo_path' => '/images/representants/elvina-chauvin.jpg',
                'is_active' => true,
            ],
            [
                'sort_order' => 10,
                'department_code' => '93',
                'department_name' => 'Seine-Saint-Denis',
                'first_name' => 'Godeline',
                'last_name' => 'MANÉ',
                'role' => 'Représentante départementale',
                'short_bio' => 'Professionnelle expérimentée avec plus de 16 années en direction opérationnelle dans le secteur hôtelier, Godeline MANÉ maîtrise la gestion de structures complexes et le pilotage d\'équipes importantes. Aidante de son mari suite à un AVC, son leadership et sa capacité de structuration constituent des atouts pour le SNA en Seine-Saint-Denis.',
                'photo_path' => '/images/representants/godeline-mane.jpg',
                'is_active' => true,
            ],
            [
                'sort_order' => 11,
                'department_code' => '972',
                'department_name' => 'Martinique',
                'first_name' => 'Carine',
                'last_name' => 'CONCONNE',
                'role' => 'Représentante départementale',
                'short_bio' => 'Inspectrice hors classe de l\'action sanitaire et sociale avec plus de 20 ans d\'expérience au cœur des politiques publiques d\'emploi, de santé et d\'insertion, Carine CONCONNE apporte une double approche institutionnelle et vécue. Son expertise constitue un levier stratégique pour le développement du SNA dans un territoire marqué par des enjeux spécifiques.',
                'photo_path' => null,
                'is_active' => true,
            ],
            [
                'sort_order' => 12,
                'department_code' => '974',
                'department_name' => 'La Réunion',
                'first_name' => 'Marion',
                'last_name' => 'ELIE',
                'role' => 'Représentante départementale',
                'short_bio' => 'Aidante familiale et professionnelle engagée, Marion ELIE est fondatrice de l\'association HandiNous+ et formatrice en troubles neurodéveloppementaux. Son engagement territorial a été reconnu par une recommandation parlementaire. Elle porte la conviction : « Apporter ce que je n\'ai pas pu avoir auparavant. »',
                'photo_path' => '/images/representants/marion-elie.jpg',
                'is_active' => true,
            ],
        ];

        foreach ($representatives as $data) {
            Representant::create($data);
        }
    }
}
