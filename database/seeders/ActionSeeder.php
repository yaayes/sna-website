<?php

namespace Database\Seeders;

use App\Models\Action;
use App\Models\ActionCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use RuntimeException;

class ActionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call(ActionCategorySeeder::class);

        foreach ($this->actions() as $action) {
            Action::updateOrCreate(
                ['slug' => $action['slug']],
                $action,
            );
        }
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function actions(): array
    {
        return array_map($this->normalize(...), [
            [
                'title' => 'Statut du salarié aidant',
                'category_slug' => 'droits-sociaux-emploi-et-protection-economique',
                'content' => $this->content(
                    'Faire reconnaitre la place du salarie aidant dans l entreprise avec des droits lisibles, activables et protecteurs tout au long du parcours d aidance.',
                    [
                        'Clarifier les droits mobilisables dans la relation de travail.',
                        'Mieux proteger les parcours professionnels fragilises par l aidance.',
                    ],
                ),
                'sort_order' => 1,
            ],
            [
                'title' => 'Programme Employeurs & Aidants',
                'category_slug' => 'droits-sociaux-emploi-et-protection-economique',
                'content' => $this->content(
                    'Structurer un programme national pour aider les employeurs a mieux identifier, accompagner et retenir les salaries aidants.',
                    [
                        'Diffuser des pratiques RH adaptees a l aidance.',
                        'Faire des employeurs des acteurs concrets de prevention des ruptures professionnelles.',
                    ],
                ),
                'sort_order' => 2,
            ],
            [
                'title' => 'Compensation retraite des aidants',
                'category_slug' => 'droits-sociaux-emploi-et-protection-economique',
                'content' => $this->content(
                    'Compenser les effets durables de l aidance sur les droits a la retraite lorsque les parcours professionnels ont ete interrompus, ralentis ou appauvris.',
                    [
                        'Limiter les penalites accumulees au moment du depart en retraite.',
                        'Reconnaitre l impact economique de l aidance sur le long terme.',
                    ],
                ),
                'sort_order' => 3,
            ],
            [
                'title' => 'Création d\'un prêt aidant familial',
                'category_slug' => 'droits-sociaux-emploi-et-protection-economique',
                'content' => $this->content(
                    'Creer un pret dedie pour absorber les depenses urgentes liees au handicap et eviter que les familles supportent seules le choc financier.',
                    [
                        'Donner une solution de financement rapide aux situations critiques.',
                        'Reduire les arbitrages economiques qui aggravent l epuisement des aidants.',
                    ],
                ),
                'sort_order' => 4,
            ],
            [
                'title' => 'Séparation conjugale et évolution du handicap',
                'category_slug' => 'droits-sociaux-emploi-et-protection-economique',
                'content' => $this->content(
                    'Mieux proteger les familles lorsque la separation conjugale se combine a une situation de handicap qui evolue et reconfigure toute l organisation de vie.',
                    [
                        'Mieux prendre en compte la charge d aidance dans les decisions familiales et materielles.',
                        'Eviter les ruptures de droits et les impasses administratives lors des separations.',
                    ],
                ),
                'sort_order' => 5,
            ],
            [
                'title' => 'Reconnaissance des compétences des aidants',
                'category_slug' => 'droits-sociaux-emploi-et-protection-economique',
                'content' => <<<'HTML'
<p>&#x1F449; L enjeu est clair : transformer une expérience subie en ressource reconnue.</p>
<h2>Notre ambition</h2>
<p>Le Syndicat National des Aidants porte la création d un dispositif national visant à :</p>
<ul>
<li>reconnaître officiellement les compétences des aidants</li>
<li>sécuriser leurs parcours professionnels</li>
<li>améliorer leur employabilité</li>
<li>prévenir le déclassement social</li>
<li>valoriser leur contribution à la société</li>
</ul>
<h2>Une réponse structurante</h2>
<p>Le projet vise à créer un cadre permettant :</p>
<h3>1. Reconnaître les compétences issues de l aidance</h3>
<ul>
<li>organisation complexe</li>
<li>coordination de parcours</li>
<li>gestion administrative</li>
<li>accompagnement humain</li>
<li>gestion de situations de crise</li>
</ul>
<h3>2. Faciliter les transitions professionnelles</h3>
<ul>
<li>retour à l emploi</li>
<li>reconversion</li>
<li>valorisation des parcours atypiques</li>
</ul>
<h3>3. Donner une existence institutionnelle à l aidance</h3>
<ul>
<li>reconnaissance officielle</li>
<li>lisibilité pour les employeurs</li>
<li>intégration dans les politiques publiques</li>
</ul>
<h2>Une logique simple : reconnaître ce qui existe déjà</h2>
<p>Les aidants développent, souvent pendant plusieurs années, des compétences comparables à celles acquises dans des formations qualifiantes.</p>
<p>&#x1F449; Pourtant, cette expertise reste aujourd hui invisible.</p>
<h2>Un levier pour toute la société</h2>
<p>Reconnaître les compétences des aidants, c est :</p>
<ul>
<li>réduire la précarité</li>
<li>améliorer l insertion professionnelle</li>
<li>valoriser un engagement essentiel</li>
<li>renforcer la cohésion sociale</li>
</ul>
<p>&#x1F449; C est aussi répondre à un enjeu économique majeur.</p>
<h2>Une dynamique nationale à construire</h2>
<p>Ce projet s inscrit dans une logique de coopération avec :</p>
<ul>
<li>les pouvoirs publics</li>
<li>les acteurs de la formation</li>
<li>les territoires</li>
<li>les partenaires sociaux</li>
</ul>
<p>Objectif : faire émerger un cadre reconnu, lisible et opérationnel à l échelle nationale.</p>
<h2>Et vous, que vous a appris l aidance ?</h2>
<p>L aidance transforme profondément les parcours.</p>
<p>&#x1F449; Quelles compétences avez-vous développées ?</p>
<p>&#x1F449; Qu avez-vous appris dans cette expérience ?</p>
<p>&#x1F449; En quoi cela pourrait-il être reconnu ?</p>
<h2>Partagez votre expérience</h2>
<p>Votre vécu est au cœur de cette démarche.</p>
<p>&#x2B07;&#xFE0F; Complétez le formulaire “Moi aussi” et contribuez à faire reconnaître les compétences des aidants.</p>
HTML,
                'sort_order' => 6,
            ],
            [
                'title' => 'Créer un statut national de l\'aidant',
                'category_slug' => 'droits-sociaux-emploi-et-protection-economique',
                'content' => <<<'HTML'
<h2>Les piliers du statut</h2>
<h3>PILIER 6 – Reconnaître l aidant comme sujet de santé</h3>
<ul>
<li>Accès à un suivi psychologique</li>
<li>Prévention de l épuisement</li>
<li>Reconnaissance des impacts sur la santé</li>
<li>Intégration dans les politiques de santé publique</li>
</ul>
<h3>PILIER 7 – Garantir les droits et l équilibre avec les institutions</h3>
<ul>
<li>Droit à l information claire</li>
<li>Droit à la contestation sans représailles</li>
<li>Dispositifs de médiation</li>
<li>Renforcement de l accompagnement juridique</li>
</ul>
<h2>⚖️ Pourquoi agir</h2>
<p><strong>✔️ Un enjeu de justice sociale</strong></p>
<p>Reconnaître un engagement indispensable à la société.</p>
<p><strong>✔️ Un enjeu économique</strong></p>
<p>Les aidants permettent des économies majeures pour la collectivité.</p>
<p><strong>✔️ Un enjeu de santé publique</strong></p>
<p>Prévenir l épuisement évite des coûts humains et financiers élevés.</p>
<h2>🏛 Positionnement du SNA</h2>
<p>Le SNA porte une vision claire :</p>
<p>👉 passer d une logique de tolérance à une logique de droits.</p>
<h2>📊 Impacts attendus</h2>
<h3>Court terme</h3>
<ul>
<li>Reconnaissance administrative</li>
<li>Meilleure orientation vers les droits</li>
</ul>
<h3>Moyen terme</h3>
<ul>
<li>Réduction de la précarisation</li>
<li>Stabilisation des parcours professionnels</li>
</ul>
<h3>Long terme</h3>
<ul>
<li>Transformation du modèle social</li>
<li>Intégration de l aidance dans les politiques publiques</li>
</ul>
<h2>🧩 Traduction politique</h2>
<p>Ce projet vise à :</p>
<ul>
<li>inscrire un statut dans la loi</li>
<li>structurer un cadre national cohérent</li>
<li>créer des droits progressifs et modulables</li>
</ul>
<h2>🪜 Feuille de route</h2>
<ol>
<li>Création du statut socle (mesure rapide et consensuelle)</li>
<li>Déploiement des niveaux progressifs</li>
<li>Intégration des droits sociaux</li>
<li>Structuration d un pilotage national</li>
</ol>
<h2>🧩 Contribution des aidants</h2>
<p>Ce projet repose sur l expertise du vécu.</p>
<p>👉 Les aidants sont les mieux placés pour définir les droits nécessaires.</p>
<h2>🔵 Et vous ?</h2>
<ul>
<li>Vous sentez-vous reconnu dans votre rôle d aidant ?</li>
<li>Avez-vous déjà rencontré des difficultés liées à l absence de statut ?</li>
<li>Qu est-ce qui devrait être prioritaire : reconnaissance, protection ou compensation ?</li>
</ul>
<h2>✉️ Passez à l action</h2>
<p>👉 Partagez votre expérience via le formulaire « Moi aussi »</p>
<p>👉 Contribuez à la construction du statut des aidants</p>
HTML,
                'sort_order' => 7,
            ],
            [
                'title' => 'Indice national d\'épuisement des aidants (INVIA)',
                'category_slug' => 'sante-repit-et-prevention-de-l-epuisement',
                'content' => $this->content(
                    'Construire un indicateur national pour objectiver les niveaux d epuisement, mieux cibler les politiques publiques et intervenir avant la rupture.',
                    [
                        'Rendre visible l epuisement des aidants a l echelle nationale.',
                        'Outiller les acteurs pour agir plus tot et plus justement.',
                    ],
                ),
                'sort_order' => 1,
            ],
            [
                'title' => 'Syndrome post-traumatique des aidants',
                'category_slug' => 'sante-repit-et-prevention-de-l-epuisement',
                'content' => $this->content(
                    'Faire reconnaitre les traumatismes psychiques que peuvent subir les aidants confrontes a des situations intenses, durables ou violentes.',
                    [
                        'Mieux depister les consequences psychiques de l aidance.',
                        'Ouvrir des parcours de soin reellement accessibles aux aidants concernes.',
                    ],
                ),
                'sort_order' => 2,
            ],
            [
                'title' => 'Jeunes aidants',
                'category_slug' => 'sante-repit-et-prevention-de-l-epuisement',
                'content' => $this->content(
                    'Mieux identifier et accompagner les jeunes aidants pour eviter l isolement, les retards scolaires et la fatigue invisible.',
                    [
                        'Reconnaître plus tot les situations d aidance chez les mineurs et jeunes adultes.',
                        'Mettre en place des reponses adaptees dans l ecole, le soin et le social.',
                    ],
                ),
                'sort_order' => 3,
            ],
            [
                'title' => 'Fratrie',
                'category_slug' => 'sante-repit-et-prevention-de-l-epuisement',
                'content' => $this->content(
                    'Mieux prendre en compte la place des freres et soeurs dans les situations de handicap, avec leurs besoins propres, leurs responsabilites et leur vulnerabilite.',
                    [
                        'Rompre l invisibilisation des fratries dans les parcours d accompagnement.',
                        'Offrir des espaces de soutien et de repit adaptes.',
                    ],
                ),
                'sort_order' => 4,
            ],
            [
                'title' => 'Parentalité et handicap',
                'category_slug' => 'sante-repit-et-prevention-de-l-epuisement',
                'content' => $this->content(
                    'Mieux soutenir les parcours de parentalite lorsque le handicap bouleverse l organisation familiale, la charge mentale et l acces aux ressources.',
                    [
                        'Mieux accompagner les parents dans la duree.',
                        'Prevenir l epuisement familial par des reponses concretement mobilisables.',
                    ],
                ),
                'sort_order' => 5,
            ],
            [
                'title' => 'Observatoire national des aidants',
                'category_slug' => 'transformation-des-politiques-publiques',
                'content' => $this->content(
                    'Structurer un observatoire national pour documenter la realite vecue par les aidants et objectiver les defaillances systemiques.',
                    [
                        'Collecter des donnees fiables sur les situations d aidance.',
                        'Faire remonter les ruptures de droits et les inegalites territoriales.',
                    ],
                ),
                'sort_order' => 1,
            ],
            [
                'title' => 'Réforme CDAPH (former pour orienter, pas juger)',
                'category_slug' => 'transformation-des-politiques-publiques',
                'content' => $this->content(
                    'Faire evoluer les pratiques de la CDAPH pour que les orientations repondent aux besoins reels, sans jugement ni suspicion envers les familles.',
                    [
                        'Mieux prendre en compte la parole des aidants.',
                        'Garantir des decisions plus lisibles et plus justes.',
                    ],
                ),
                'sort_order' => 2,
            ],
            [
                'title' => 'Garantir l\'exercice effectif des droits en établissement',
                'category_slug' => 'transformation-des-politiques-publiques',
                'content' => $this->content(
                    'Faire respecter les droits deja reconnus en etablissement et lutter contre les obstacles qui empechent leur application concrete.',
                    [
                        'Rendre effectifs les droits des personnes accompagnees et de leurs proches.',
                        'Mieux encadrer les pratiques qui creent des ruptures de parcours.',
                    ],
                ),
                'sort_order' => 3,
            ],
            [
                'title' => 'Securisation du transport (taxi)',
                'category_slug' => 'transformation-des-politiques-publiques',
                'content' => $this->content(
                    'Encadrer les conditions de transport pour eviter les mises en danger, les refus de prise en charge et les frais injustifies supportes par les familles.',
                    [
                        'Clarifier les responsabilites des transporteurs.',
                        'Garantir des trajets adaptes et securises.',
                    ],
                ),
                'sort_order' => 4,
            ],
            [
                'title' => 'Levée sanitaire des déchets liés au handicap',
                'category_slug' => 'transformation-des-politiques-publiques',
                'content' => $this->content(
                    'Faire reconnaitre la charge supplementaire liee aux dechets sanitaires produits au domicile et obtenir des solutions concretes pour les familles.',
                    [
                        'Reduire les couts et contraintes supportes a domicile.',
                        'Mettre en place des dispositifs adaptes aux situations de handicap.',
                    ],
                ),
                'sort_order' => 5,
            ],
            [
                'title' => 'Parking CHU / acces aux soins',
                'category_slug' => 'transformation-des-politiques-publiques',
                'content' => $this->content(
                    'Lever les freins d acces aux soins causes par les stationnements payants, les circuits complexes et l absence d adaptation des CHU aux realites d aidance.',
                    [
                        'Faciliter l acces physique aux soins.',
                        'Mieux prendre en compte le temps et la charge des aidants.',
                    ],
                ),
                'sort_order' => 6,
            ],
            [
                'title' => 'Sécuriser le passage à la majorité en situation de handicap',
                'category_slug' => 'transformation-des-politiques-publiques',
                'content' => <<<'HTML'
<h2>Impacts attendus</h2>
<h3>Court terme</h3>
<ul>
<li>Simplification des démarches</li>
</ul>
<h3>Moyen terme</h3>
<ul>
<li>Diminution des conflits familiaux</li>
<li>Meilleure sécurité juridique</li>
</ul>
<h3>Long terme</h3>
<ul>
<li>Continuité des parcours de vie</li>
<li>Renforcement de la confiance dans le système</li>
</ul>
<h2>&#x1F9E9; Traduction politique</h2>
<p>Cette réforme vise à :</p>
<ul>
<li>adapter le droit aux situations de handicap</li>
<li>sécuriser juridiquement les dispositifs existants</li>
<li>reconnaître la réalité de l aidance parentale</li>
</ul>
<h2>&#x1FA9C; Feuille de route</h2>
<ol>
<li>Identification des blocages juridiques</li>
<li>Proposition de modification législative</li>
<li>Concertation avec les acteurs judiciaires</li>
<li>Intégration dans le cadre légal</li>
</ol>
<h2>&#x1F9E9; Contribution des aidants</h2>
<p>Ce dossier s appuie sur les retours des familles confrontées à ces situations.</p>
<p>&#x1F449; Leur expérience permet d identifier les incohérences du système.</p>
<h2>&#x1F535; Et vous ?</h2>
<ul>
<li>Avez-vous rencontré des difficultés lors du passage à la majorité ?</li>
<li>Le système vous a-t-il semblé adapté à votre situation ?</li>
<li>Qu est-ce qui aurait simplifié votre parcours ?</li>
</ul>
<h2>&#x2709;&#xFE0F; Passez à l action</h2>
<p>&#x1F449; Partagez votre expérience via le formulaire « Moi aussi »</p>
<p>&#x1F449; Contribuez à faire évoluer le cadre juridique</p>
HTML,
                'sort_order' => 7,
            ],
            [
                'title' => 'Reconnaître les aidants comme partenaires essentiels du parcours de soin',
                'category_slug' => 'parcours-de-soins',
                'content' => <<<'HTML'
<h2>Faire des aidants de véritables partenaires du système de santé</h2>
<h3>&#x1F9E9; Enjeu central</h3>
<p>Dans des millions de situations :</p>
<ul>
<li>handicap</li>
<li>maladie chronique</li>
<li>perte d autonomie</li>
</ul>
<p>les aidants assurent une part essentielle du soin :</p>
<ul>
<li>observation quotidienne</li>
<li>gestion des traitements</li>
<li>coordination des rendez-vous</li>
<li>présence constante</li>
</ul>
<p>&#x1F449; Pourtant, leur rôle reste insuffisamment reconnu.</p>
<h3>&#x1F4C9; Constat</h3>
<p><strong>Un rôle central mais invisible</strong></p>
<p>Les aidants :</p>
<ul>
<li>détectent les signaux faibles</li>
<li>alertent en cas de dégradation</li>
<li>assurent la continuité des soins</li>
</ul>
<p>&#x1F449; Ils sont déjà au cœur du système sans statut clair.</p>
<p><strong>Un système encore cloisonné</strong></p>
<p>Aujourd hui :</p>
<ul>
<li>les professionnels décident</li>
<li>les aidants exécutent</li>
<li>la coordination reste fragile</li>
</ul>
<p>&#x1F449; Une organisation qui ne reflète pas la réalité du terrain.</p>
<p><strong>Des pertes d efficacité</strong></p>
<p>Ce manque de reconnaissance entraîne :</p>
<ul>
<li>des incompréhensions</li>
<li>des erreurs évitables</li>
<li>des hospitalisations inutiles</li>
</ul>
<p>&#x1F449; Un coût humain et économique évitable.</p>
<h3>&#x26A0;&#xFE0F; Problème public</h3>
<p>Le système de santé repose déjà sur les aidants :</p>
<p>&#x1F449; sans les intégrer formellement.</p>
<p>Résultat :</p>
<ul>
<li>une coopération informelle</li>
<li>une responsabilité floue</li>
<li>une inefficacité structurelle</li>
</ul>
<h3>&#x1F3AF; Objectif du SNA</h3>
<p>Faire évoluer le système vers un modèle de :</p>
<p>&#x1F449; co-partenariat aidants-soignants, structuré, reconnu et sécurisé.</p>
<h3>&#x1F9E9; Une réponse structurante</h3>
<p><strong>PILIER 1 - Créer un statut d aidant partenaire de soins</strong></p>
<ul>
<li>Identification dans le dossier médical</li>
<li>Reconnaissance comme interlocuteur</li>
<li>Intégration dans les échanges de soins</li>
</ul>
<p>&#x1F449; Reconnaître l expertise du quotidien.</p>
HTML,
                'sort_order' => 1,
            ],
            [
                'title' => 'Reconnaissance de la présence hospitalière des aidants',
                'category_slug' => 'parcours-de-soins',
                'content' => <<<'HTML'
<h2>Impacts attendus</h2>
<h3>Court terme</h3>
<ul>
<li>Soulagement financier des familles</li>
<li>Meilleure sécurité des patients</li>
</ul>
<h3>Moyen terme</h3>
<ul>
<li>Amélioration du fonctionnement hospitalier</li>
<li>Réduction des incidents</li>
</ul>
<h3>Long terme</h3>
<ul>
<li>Transformation du modèle d accompagnement hospitalier</li>
<li>Reconnaissance institutionnelle des aidants</li>
</ul>
<h2>&#x1F9E9; Traduction politique</h2>
<p>Cette action vise à :</p>
<ul>
<li>créer un statut juridique</li>
<li>modifier le Code de la santé publique</li>
<li>encadrer les pratiques hospitalières</li>
</ul>
<h2>&#x1FA9C; Feuille de route</h2>
<ol>
<li>Inscription du statut dans la loi</li>
<li>Décret d application</li>
<li>Mise en œuvre dans les établissements</li>
<li>Déploiement du label</li>
</ol>
<h2>&#x1F9E9; Contribution des aidants</h2>
<p>Cette mesure repose sur une réalité vécue :</p>
<p>&#x1F449; des familles contraintes de payer pour sécuriser les soins</p>
<h2>&#x1F535; Et vous ?</h2>
<ul>
<li>Avez-vous déjà dû rester à l hôpital pour sécuriser un proche ?</li>
<li>Avez-vous payé pour cette présence ?</li>
<li>Que changerait une reconnaissance officielle ?</li>
</ul>
<h2>&#x2709;&#xFE0F; Passez à l action</h2>
<p>&#x1F449; Partagez votre expérience via le formulaire « Moi aussi »</p>
<p>&#x1F449; Contribuez à faire évoluer les droits</p>
HTML,
                'sort_order' => 2,
            ],
        ]);
    }

    /**
     * @param  array<int, string>  $items
     */
    private function content(string $paragraph, array $items): string
    {
        $list = collect($items)
            ->map(fn (string $item) => '<li>'.$item.'</li>')
            ->implode('');

        return '<p>'.$paragraph.'</p><ul>'.$list.'</ul>';
    }

    /**
     * @param  array<string, mixed>  $action
     * @return array<string, mixed>
     */
    private function normalize(array $action): array
    {
        $categoryId = ActionCategory::query()
            ->where('slug', $action['category_slug'])
            ->value('id');

        if (! is_int($categoryId)) {
            throw new RuntimeException(sprintf('Categorie introuvable pour le slug [%s].', $action['category_slug']));
        }

        return [
            'title' => $action['title'],
            'slug' => Str::slug($action['title']),
            'action_category_id' => $categoryId,
            'content' => $action['content'],
            'sort_order' => $action['sort_order'],
            'is_published' => true,
        ];
    }
}
