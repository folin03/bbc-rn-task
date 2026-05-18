# This is React Native CLI app for BBC test task

## Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: environmental variables

for articles to work correctly add .env file in the root folder.

The .env file should contain NEWS_API_KEY=[your newsapi key]

## Step 2: install dependencies

if you have no node_modules folder you need to install dependencies, run the following command

```sh
# Using npm
npm install
```

## Step 3: Build and run your app

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies.

The time after clone, run the Ruby bundler to install CocoaPods itself:

```sh
npm run bundle-i
npm run pod-i
```

Then, and every time you update your native dependencies, run:

```sh
npm run pod-i
```

Now you can run the app by using the following command:

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

## Check code

To run your lint, prettier, TS checks and to run tests use:

```sh
npm run checks
```

## Assumptions

1. The application assumes the NewsAPI service is available and responsive.
   As this is a client-side technical assessment, no custom backend or proxy layer
   was introduced.

2. The application requests English-language articles using the `language=en`
   parameter. However, article metadata/content accuracy depends on the upstream
   NewsAPI provider.

3. Popularity ordering is delegated to the NewsAPI `sortBy=popularity`
   implementation rather than introducing a custom ranking algorithm.

4. The UI assumes certain article properties such as images, descriptions,
   or content may be unavailable and gracefully handles missing values.

## Trade-offs

1. React Query was chosen for server-state management instead of Redux async flows
    because the primary concerns of the application are caching, pagination,
    background refetching, and API synchronisation.
    This reduced custom state-management complexity while improving maintainability.

2. A bare React Native setup was intentionally chosen to align with the assessment
    requirements and better reflect production mobile engineering environments,
    including native tooling such as Xcode and Android Studio.

3. FlashList was selected over FlatList to improve rendering performance and memory
    efficiency for large article feeds and infinite scrolling behaviour.

4. Infinite scrolling and paginated fetching were implemented to avoid overwhelming
    users with large result sets while also reducing memory usage and unnecessary
    network requests.

5. A lightweight theme/token structure was implemented instead of a larger design
    system or CSS-in-JS solution to keep the application focused on performance, and simplicity and speed of development.

6. Offline persistence was not implemented due to the scope of the assessment.
    However, React Query caching provides temporary in-memory data reuse and reduces
    unnecessary refetching during normal usage.

7. Due to time constraints, end-to-end testing coverage focuses on the primary
    user journey rather than exhaustive scenario coverage.

8. Because the NewsAPI free tier has strict request limits, caching, pagination,
    and controlled query execution were prioritised to minimise unnecessary API
    calls.

9. Article detail was introdused as modal instead of screen to eliminate need for navigation system and to support speed of development.

## Key architectural decisions

The overall architecture intentionally prioritises maintainability,
predictability, performance, and delivery simplicity over unnecessary
abstraction or over-engineering.

1. Feature-Based Folder Structure

   > The application uses a feature-oriented structure rather than grouping files
  purely by technical type.
   >
   > This approach improves scalability and maintainability by keeping related logic,
  types, services, hooks, and state management close together within the
  `features/articles` domain.

2. Separation Of Server State And UI State

   > Server state and UI state were intentionally separated.
   >
   > React Query manages asynchronous server state such as article fetching, pagination, caching, loading states, and retries.
   >
   > Zustand manages lightweight client-side UI state such as selected domains
  and sorting preferences.

3. React Query For Data Fetching

   > React Query was chosen to handle API communication, caching, pagination,
  and stale data management.
   >
   > This significantly reduces custom networking boilerplate while improving:
   >- cache consistency
   >- retry handling
   >- background refetching
   >- request deduplication
   >- perceived performance

4. Service Layer Abstraction

   > API communication is abstracted into a dedicated service layer rather than
   > being coupled directly to UI components.
   >
   > This improves:
   >- testability
   >- separation of concerns
   >- maintainability
   >- future backend flexibility

5. FlashList For Feed Rendering Performance

   > FlashList was selected instead of FlatList to improve rendering performance,
  memory efficiency, and scroll smoothness for large paginated feeds.

6. Pagination And Infinite Scrolling

   > Infinite scrolling with paginated API requests was implemented to avoid loading
  large result sets into memory simultaneously.
   >
   > This improves:
   >- performance
   >- API efficiency
   >- usability
   >- perceived responsiveness

7. Lightweight Theme Architecture

   > A lightweight token-based theme structure was introduced for spacing, colours,
  and typography to ensure UI consistency without introducing unnecessary styling
  abstractions or runtime complexity.

8. Accessible And Defensive UI Design

   > The UI was designed to gracefully handle incomplete article data and loading
  states while also considering accessibility through touch target sizing and
  accessibility labels.

9. Query Key-Based Caching Strategy

   > Caching behaviour is driven by query keys derived from selected domains and
  sorting preferences.
   >
   > This enables efficient reuse of previously fetched data while minimising
  unnecessary API requests.

10. CI Validation Pipeline

    >A lightweight CI pipeline validates type safety, linting, and unit tests on
  pull requests and pushes to maintain code quality and prevent regressions.

## Known limitations

The implementation intentionally prioritised clean architecture,
maintainability, performance, and delivery simplicity over exhaustive
feature completeness.

1. Dependency On External API Availability
   > The application relies entirely on the external NewsAPI service.
   If the API is unavailable, rate-limited, or returns inconsistent data,
   article loading may be affected.

2. Free-Tier API Rate Limits
   > The NewsAPI free-tier request limit (100 requests/day) restricts extensive
   testing and aggressive background refetching strategies.
   >
   > Caching and pagination were implemented to help minimise unnecessary requests.

3. No Persistent Offline Storage
   > The current implementation uses in-memory caching via React Query but does not
   persist data locally between application launches.
   >
   > A production-ready implementation could introduce persistent storage using
   MMKV or AsyncStorage.

4. Limited Article Detail Experience
   > The application currently focuses on article discovery and feed browsing.
   >
   > A richer reading experience such as dedicated article detail screens,
   deep linking, or in-app web views was intentionally left outside the scope
   of the assessment.

5. Popularity Sorting Controlled By Upstream API

   > Popularity ranking is delegated to the NewsAPI provider and therefore depends
   > on the API's internal ranking implementation.

6. Image Optimisation Is Basic

   > Remote article images are rendered directly from source URLs without advanced
   > image caching, placeholders, or progressive loading optimisations.

7. E2E Test Coverage Scope

   > End-to-end testing currently focuses on critical user journeys rather than
   > full regression coverage due to the scope of the exercise.

8. No Backend Proxy Layer

   > API requests are made directly from the client application.
   >
   > A production-scale implementation would likely introduce a backend proxy layer
   > for improved security, analytics, rate limiting, and response shaping.

9. Limited Accessibility Audit
   > Basic accessibility considerations were implemented, including accessibility
   labels and touch target sizing, but a full accessibility audit was outside
   the scope of the assessment.

10. Query Prefetching Not Implemented
    > The current implementation relies on on-demand fetching and caching.
    >
    > Additional optimisations such as predictive query prefetching could further
    improve perceived responsiveness.

## Potential future improvements

- persisted offline caching
- article detail screen
- deeper accessibility auditing
- analytics instrumentation
- Storybook integration
- richer skeleton loading states
- image caching optimisation
- query prefetching
- shared component library extraction
- styling design system (e.g. styled-components)
- propper theme patterns
- GitHub safe guarding (e.g. prevent direct push to main and use pre-release brunch)
- add Detox to CI and use self-hosted runner to save resources
- with self-hosted runner implemented add automatic deployment using github sctions and fastlane
