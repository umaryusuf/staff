<script>
  import { NotificationDisplay } from '@beyonk/svelte-notifications';
  import Sidebar from './_sidebar.svelte';
  import Header from './_header.svelte';

  let layoutName = "pages/_layout";
</script>

<NotificationDisplay />

<Sidebar />

<main class="content ht-100v pd-0">
  <Header />

  <slot scoped={{ layoutName }}>
    <!-- optional fallback -->
  </slot>
</main>
