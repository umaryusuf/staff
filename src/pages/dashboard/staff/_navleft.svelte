<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { notifier } from '@beyonk/svelte-notifications';
  import { URL, handleError } from '../../../helpers.js';
  import { staffStore, user } from '../../../stores.js'; 

  const dispatch = createEventDispatcher();

  let staff = [];
  let copy = [];
  let userData = {};

  user.useLocalStorage();
  
  user.subscribe(data => {
    userData = data;
  });

  // staffStore.useLocalStorage();

  // staffStore.subscribe(item => {
  //   staff = item;
  //   copy = item;
  // });

  onMount(() => { 
    fetch(`${URL}/staff/${userData.school_info.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth-token')
      },
    })
    .then(res => res.json()) 
    .then(data => {

      if(data.status === "success") {
        //staffStore.set(data.data);
        //console.log(data);
        staff = [...data.data]
        copy = [...data.data]
        notifier.success(data.message);
      } else {
        // set staff to empty array
        //staffStore.set([]);
        staff = [];
        staff = [];
        handleError(data.message);
      }
      localStorage.setItem('auth-token', data.token);
    })
    .catch(error => console.log(error));
  });

  let search;

  function handleSearch() {

    let data = copy.filter(el => {
      return el.fullname.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });

    staff = [...data];
    // console.log(data);
  }
</script>

<div class="contact-navleft">
  <nav class="nav flex-column">
      <a href="#!" class="nav-link active" data-toggle="tab">
          <span data-toggle="tooltip" title="" data-placement="right" data-original-title="All Contacts"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span>
      </a>
      <a href="#!" class="nav-link" data-toggle="tab">
          <span data-toggle="tooltip" title="" data-placement="right" data-original-title="Recently Contacted"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone-call"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></span>
      </a>
      <a href="#!" class="nav-link" data-toggle="tab">
          <span data-toggle="tooltip" title="" data-placement="right" data-original-title="Favorites"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
      </a>
      <a href="#!" class="nav-link" data-toggle="tab">
          <span data-toggle="tooltip" title="" data-placement="right" data-original-title="Contact Labels"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tag"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7" y2="7"></line></svg></span>
      </a>
      <a href="#!" class="nav-link" data-toggle="tab">
          <span data-toggle="tooltip" title="" data-placement="right" data-original-title="Export Contacts"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg></span>
      </a>
      <a href="#!" class="nav-link">
          <span data-toggle="tooltip" title="" data-placement="right" data-original-title="Contact Settings"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></span>
      </a>
  </nav>
</div>
<!-- contact-navleft -->

<div class="contact-sidebar">
  <div class="contact-sidebar-header">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <div class="search-form">
        <input type="search" bind:value={search} on:input={handleSearch} class="form-control" placeholder="Search staff">
      </div>
      <a href="#modalNewContact" class="btn btn-xs btn-icon btn-primary" data-toggle="modal">
          <span data-toggle="tooltip" title="" id="schools-tooltip" data-original-title="Add New Contact">{staff.length}</span>
      </a>
      <!-- contact-add -->
  </div>
  <!-- contact-sidebar-header -->
  <div class="contact-sidebar-body ps ps--active-y">
    <div class="tab-content">
      <div id="tabContact" class="tab-pane fade active show">
        <div class="contact-list" id="contact-list"  style="border-right: 1px solid #8392a536;">
          {#each staff as s, i (s.id)}
            <a href="/dashboard/staff/{s.id}" 
              class="media school-media" 
              data-school-id="{s.id}"
              on:click={() => dispatch('route-changed', s.id)}  
            >
              <div class="avatar avatar-sm avatar-online">
                <span class="avatar-initial rounded-circle bg-gray-700">{s.fullname.charAt(0)}</span>
              </div>
              <div class="media-body mg-l-10">
                <h6 class="tx-13 mg-b-3">{s.fullname}</h6>
              </div>
            </a>
          {/each}
        </div><!-- contact-list -->
      </div>
    </div><!-- tab-content -->
  </div><!-- contact-sidebar-body -->
</div>