<script>
  import { logout } from "../../constants";
  import { user } from '../../stores.js';

  let userData = {};

   user.useLocalStorage();
  
  user.subscribe(data => {
    userData = data;
  });

  const { school_info: { name }} = userData;
</script>

<div class="content-header">
  <div>
    <!-- <i data-feather="search"></i> -->
    <h5 style="font-weight: bold;">
      Education Commission Staff Data System | {(name !== undefined) ? name : ""}
    </h5>
  </div>
  <nav class="nav">
    <button on:click={() => logout()} class="btn btn-sm pd-x-15 btn-danger btn-uppercase mg-l-5">
      <i data-feather="file" class="wd-10 mg-r-5"></i> Logout
    </button>
  </nav>
</div>