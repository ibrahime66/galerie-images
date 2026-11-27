# Fiche de compréhension du projet (exercice 2-A)

Groupe : à compléter · Semaine 2

Cette fiche décrit le code de départ fourni, tel qu'il se trouve dans le commit « Code de départ fourni ».

## 1. Rôle de chaque dossier

| Dossier | Rôle | Utilisé par l'écran ? |
| --- | --- | --- |
| `data/` | Données de départ : le tableau `imagesData` de 3 images (`id`, `title`, `category`, `image`, `favorite`). | Oui : importé par `GalleryScreen`. |
| `components/` | Composants d'affichage réutilisables. `ImageCard` dessine une carte à partir de l'objet `item` qu'il reçoit en props. | Oui pour `ImageCard`. `SearchBar` et `CategoryFilter` figurent dans l'arborescence du sujet mais n'existent pas : le champ de recherche est écrit directement dans l'écran. |
| `screens/` | Écrans complets de l'application. `GalleryScreen` est le seul écran ; `App.js` l'affiche. | Oui. |
| `store/` | Trois versions de la gestion des favoris : `redux/gallerySlice.js`, `zustand/useGalleryStore.js`, `recoil/favoritesState.js`. | Non : aucun fichier ne les importe, et leurs bibliothèques ne sont pas installées. |
| `context/` | Quatrième version : `GalleryContext` et son `GalleryProvider`, qui gardent les favoris avec `useState`. | Non : le `Provider` n'est pas placé dans `App.js` et aucun composant n'appelle `useContext`. |

En résumé, l'application exécute seulement la chaîne `App.js` → `screens/GalleryScreen.js` → `data/images.js` et `components/ImageCard.js`. Le seul état réellement utilisé est le texte de recherche, gardé dans l'écran avec `useState`.

## 2. La grille

Dessin à la main joint (photo). Il représente une ligne de la `FlatList` avec ses deux cartes et leurs marges :

```
|<---------------- largeur de la ligne (100 %) ---------------->|
| 1% |       carte 48 %       | 1% | 1% |       carte 48 %       | 1% |
|    |  image en fond          |    |    |  image en fond          |    |
|    |                         |    |    |                         |    |
|    |  [ bandeau : titre ]    |    |    |  [ bandeau : titre ]    |    |
```

**Deux cartes par ligne.** Deux réglages travaillent ensemble :

- dans `GalleryScreen`, `numColumns={2}` demande à la `FlatList` de ranger les éléments par lignes de deux, côte à côte ;
- dans `ImageCard`, le style `card` donne à chaque carte `width: '48%'` et `margin: '1%'` de chaque côté, soit 50 % de la ligne par carte, et donc 100 % pour deux cartes.

Les pourcentages se calculent sur la largeur de la ligne, c'est-à-dire l'écran moins les 10 px de `paddingHorizontal` du conteneur de chaque côté. La hauteur est fixe : `height: 220`.

**Le titre en bas de l'image.** `ImageBackground` se comporte comme une `View` dont l'image est le fond : on peut y placer des enfants. En React Native, l'axe principal est vertical par défaut (`flexDirection: 'column'`). `justifyContent: 'flex-end'` pousse donc l'enfant, le bandeau `overlay`, tout en bas de la carte.

Ce bandeau a un fond noir à 40 % d'opacité (`rgba(0,0,0,0.4)`), pour que le texte blanc reste lisible sur n'importe quelle photo. Ses coins inférieurs sont arrondis à 20, comme l'image (`imageStyle={{ borderRadius: 20 }}`).

## 3. Le chemin d'une recherche

1. L'utilisateur tape une lettre dans le `TextInput`, qui appelle `onChangeText` avec le texte complet du champ.
2. `onChangeText={setSearch}` transmet ce texte à `setSearch`, qui met à jour l'état `search`.
3. Comme l'état a changé, React exécute à nouveau la fonction `GalleryScreen` : c'est un nouveau rendu.
4. Pendant ce rendu, `filteredImages` est recalculé :
   `imagesData.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))`.
   - Le titre et le texte saisi sont mis en minuscules : la recherche ignore donc la casse.
   - Si le champ est vide, `includes('')` est toujours vrai et toutes les images sont gardées.
5. La `FlatList` reçoit la nouvelle liste dans `data`. Grâce à `keyExtractor` (l'`id`), elle reconnaît les cartes qui restent, retire les autres et appelle `renderItem`, donc `ImageCard`, pour ce qu'elle doit afficher.
6. Le champ est contrôlé (`value={search}`) : ce qu'il affiche vient toujours de l'état.

La liste filtrée n'est stockée nulle part : c'est une valeur calculée à chaque rendu à partir de `search` et de `imagesData`.

Nous avons aussi noté que la recherche porte seulement sur le titre (pas sur la catégorie), qu'elle tient compte des accents (« marche » ne trouve pas « Marché Madina ») et qu'elle se relance à chaque frappe.

## 4. Où est stockée l'information « cette image est un favori » ?

À cinq endroits, sans lien entre eux :

| Endroit | Forme | Utilisé ? |
| --- | --- | --- |
| `data/images.js` | champ `favorite: false` dans chaque image | Jamais lu ni modifié ; `ImageCard` ne l'affiche pas. |
| `context/GalleryContext.js` | tableau `favorites` dans un `useState` | Non relié à l'écran. |
| `store/redux/gallerySlice.js` | `favorites` dans `initialState` | Non relié. |
| `store/zustand/useGalleryStore.js` | `favorites` dans le store | Non relié. |
| `store/recoil/favoritesState.js` | atome `favoritesState` | Non relié. |

Dans le code de départ, l'utilisateur ne peut donc marquer aucune image comme favorite : aucune carte n'a de bouton, et aucune des quatre versions n'est branchée.

Ces versions ont toutes la même forme : un tableau qui reçoit l'objet image entier par `addFavorite(image)`. Nous y voyons trois problèmes, que nous détaillerons dans l'analyse critique (2-B) :

- le champ `favorite` et le tableau `favorites` peuvent dire deux choses différentes ;
- rien n'empêche d'ajouter deux fois la même image ;
- aucune action ne permet de retirer un favori.
