<script>
  import { onMount } from "svelte";
  import { user, singleStaff, schoolsStore, queries, leaves } from "../../../../stores.js";
  import { URL, handleError } from "../../../../constants.js";
  import { notifier } from "@beyonk/svelte-notifications";
  export let route;

  let staff = [];
  let schools = [];
  let staffData = {};
  let queriesData = [];
  let leavesData = [];
  let selected, date;
  let activeTab = "default";
  let userData = {};

  user.useLocalStorage();
  
  user.subscribe(data => {
    userData = data;
  });

  const { id } = route.params;
  const school_id = userData.school_info.id;

  queries.subscribe(items => {
    queriesData = items;
  });

  leaves.subscribe(items => {
    leavesData = items;
  });

  singleStaff.subscribe(data => {
    staffData = data;
  });

  schoolsStore.subscribe(item => {
    schools = [...item];
  });

  onMount(() => { 
    fetch(`${URL}/staff/${school_id}/${id}`, {
      headers: {
        'Authorization': localStorage.getItem('auth-token')
      }
    })
    .then(res => res.json())
    .then(data => {

      if(data.status === 'success') {
        singleStaff.set(...data.data);
        notifier.success(data.message);
      } else {
        singleStaff.set([]);
        handleError(data.message);
      }
      localStorage.setItem('auth-token', data.token)
    })
    .catch(error => console.log(error));

    fetch(`${URL}/schools`, {
      headers: {
        'Authorization': localStorage.getItem('auth-token')
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.status === 'success') {
        console.log(data)
        schoolsStore.set(data.data);
        notifier.success(data.message);
      } else {
        schoolsStore.set([]);
        handleError(data.message);
      }
      localStorage.setItem('auth-token', data.token)
    })
    .catch(error => console.log(error));

  });

  function getLeaves(school_id, staff_id) {
    fetch(`${URL}/leave/${school_id}/${staff_id}`, {
      headers: {
        authorization: localStorage.getItem('auth-token'),
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.status === "success") {
        leaves.set(data.data);
        notifier.success(data.message);
      } else {
        leaves.set([]);
        handleError(data.message);
      }
      localStorage.setItem("auth-token", data.token);
      // TODO - update leaves store
    })
    .catch(error => console.log(error));
  }

  function getQueries(school_id, staff_id) {
    fetch(`${URL}/staff/query/${school_id}/${staff_id}`, {
      headers: {
        authorization: localStorage.getItem('auth-token'),
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.status === "success") {
        queries.set(data.data);
        notifier.success(data.message);
      } else {
        queries.set([]);
        handleError(data.message);
      }
      localStorage.setItem('auth-token', data.token)
    })
    .catch(error => console.log(error));
  }

  function changeTab(e) {
    e.preventDefault();
    const { tabId } = e.target.dataset;
    activeTab = tabId;

    switch (tabId) {
      case "queries":
        getQueries(school_id, id);
        break;

      case "leaves":
        getLeaves(school_id, id);
        break;
    
      default:
        break;
    }
    console.log(tabId);
  }

  function handleTransfer(e) {
    
    if(!selected) {
      notifier.danger("school not selected");
      return;
    }

    const url = `${URL}/transfer/${route.params.schoolid}`;
    const data = {
      from: route.params.schoolid, 
      to: selected, 
      staff_id: route.params.id
    };

    console.log(data);

    // make api request to transfer staff
  }

</script>

<style>
  .passport {
    width: 180px;
    height: 200px;
    border: 2px solid #1C2839;
    border-radius: 2px;
  }
  .passport img {
    min-width: 100%;
    min-height: 100%;
    max-width: 100%;
    max-height: 100%;
  }

  .btn-sec {
    background-color: #1B2739;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    padding: 10px;
  }

  .contact-content-body {
    background: #fff;
  }
</style>



<div class="contact-content">

  {#if (staffData)}
  <div class="contact-content-header">
    <nav class="nav">
      <a href="#!"
        class="nav-link {activeTab === "default" ? "active": ""}" 
        on:click={changeTab} 
        data-tab-id="default" 
        data-toggle="tab"
      >
        Staff Information
      </a>
      <a href="#!"
        class="nav-link {activeTab === "queries" ? "active": ""}" 
        on:click={changeTab} 
        data-tab-id="queries" 
        data-toggle="tab"
      >
        Queries
      </a>
      <a href="#!"
        class="nav-link {activeTab === "leaves" ? "active": ""}" 
        on:click={changeTab} 
        data-tab-id="leaves" 
        data-toggle="tab"
      >
        Leaves
      </a>
      <a href="#!"
        class="nav-link {activeTab === "transfer" ? "active": ""}" 
        on:click={changeTab} 
        data-tab-id="transfer" 
        data-toggle="tab"
      >
        Transfer Staff
      </a>
    </nav>
    <a href="#!" id="contactOptions" class="text-secondary mg-l-auto d-xl-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-more-horizontal">
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>
    </a>
  </div>
  <!-- contact-content-header -->

  <div class="contact-content-body ps ps--active-y p-3">
    <div class="tab-content">
      {#if (activeTab === "default")}
      <div 
        id="contactInformation" 
        class="tab-pane {activeTab === "default" ? "show active" : ""} pd-20 pd-xl-25"
      >
        <div class="d-flex align-items-center justify-content-between mg-b-25">
          <h6 class="mg-b-0">Staff Details</h6>
          <div class="d-flex">
          </div>
        </div>

        <div class="row">
          <div class="col col-sm-4 offset-7">
            <div class="passport mb-5">
              <img src={staffData.photopath} alt="{staffData.fullname} passsport">
            </div>
          </div>
        </div>
        <!-- row -->

        <div class="row">
          <div class="col-4 col-sm">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Full Name
            </label>
            <p class="mg-b-0">{staffData.fullname}</p>
          </div>
          <!-- col -->
          <div class="col-4 col-sm">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Sex
            </label>
            <p class="mg-b-0">{staffData.sex}</p>
          </div>
          <!-- col -->
          <div class="col-sm mg-t-20 mg-sm-t-0">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Birth Date
            </label>
            <p class="mg-b-0">{staffData.birthdate}</p>
          </div>
          <!-- col -->
        </div>
        <!-- row -->

        <div class="row mt-3">
          <div class="col-4 col-sm">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Marital Status
            </label>
            <p class="mg-b-0">{staffData.marital_status}</p>
          </div>
          <!-- col -->
          <div class="col-4 col-sm">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Date Of Entry
            </label>
            <p class="mg-b-0">{staffData.dateofentry}</p>
          </div>
          <!-- col -->
          <div class="col-sm mg-t-20 mg-sm-t-0">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Qualification
            </label>
            <p class="mg-b-0">{staffData.qualification}</p>
          </div>
          <!-- col -->
        </div>
        <!-- row -->

        <div class="row mt-3">
          <div class="col-4 col-sm">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Designation
            </label>
            <p class="mg-b-0">{staffData.designation}</p>
          </div>
          <!-- col -->
          <div class="col-4 col-sm">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Discipline
            </label>
            <p class="mg-b-0">{staffData.discipline}</p>
          </div>
          <!-- col -->
          <div class="col-sm mg-t-20 mg-sm-t-0">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Staff type
            </label>
            <p class="mg-b-0">{staffData.staff_type}</p>
          </div>
          <!-- col -->
        </div>
        <!-- row -->

        <div class="row mt-3">
          <div class="col-4 col-sm">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Years Of Experience
            </label>
            <p class="mg-b-0">{staffData.years_of_experience}</p>
          </div>
          <!-- col -->
          <div class="col-4 col-sm">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Employment Type
            </label>
            <p class="mg-b-0">{staffData.employment_type}</p>
          </div>
          <!-- col -->
          <div class="col-sm mg-t-20 mg-sm-t-0">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Contract Type
            </label>
            <p class="mg-b-0">{staffData.contract_type}</p>
          </div>
          <!-- col -->
        </div>
        <!-- row -->

        <div class="row mt-3">
          <div class="col-3 col-sm">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Gross Salary
            </label>
            <p class="mg-b-0">{staffData.gross_salary}</p>
          </div>
          <!-- col -->
          <div class="col-5 col-sm">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Responsibility Allowances
            </label>
            <p class="mg-b-0">{staffData.responsibility_allowances}</p>
          </div>
          <!-- col -->
          <div class="col-4 mg-t-20 mg-sm-t-0">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Status
            </label>
            <p class="mg-b-0">{staffData.status}</p>
          </div>
          <!-- col -->
        </div>
        <!-- row -->

        <div class="row mt-3">
          <div class="col-6 col-sm">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Transfer History
            </label>
            <p class="mg-b-0">{staffData.transfer_history}</p>
          </div>
          <!-- col -->
          <div class="col-6 col-sm">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Church Membership
            </label>
            <p class="mg-b-0">{staffData.church_membership}</p>
          </div>
        </div>
        <!-- row -->

        <div class="row mt-3">
          <div class="col-6 col-sm">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Vert Ver Status
            </label>
            <p class="mg-b-0">{staffData.cert_ver_status}</p>
          </div>
          <!-- col -->
          <div class="col-6 col-sm">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Wofbi Level
            </label>
            <p class="mg-b-0">{staffData.wofbi_level}</p>
          </div>
          <!-- col -->
          <div class="col-sm mg-t-20 mg-sm-t-0">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Disciplinary Cases
            </label>
            <p class="mg-b-0">{staffData.disciplinary_cases}</p>
          </div>
          <!-- col -->
        </div>
        <!-- row -->

        <h6 class="mg-t-40 mg-b-20">Contact Details</h6>

        <div class="row row-sm">
          <div class="col-6 col-sm-4">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Phone
            </label>
            <p class="tx-primary tx-rubik mg-b-0">{staffData.phone}</p>
          </div>
          <div class="col-6 col-sm-4">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Email
            </label>
            <p class="tx-primary tx-rubik mg-b-0">{staffData.email}</p>
          </div>
          <div class="col-6 col-sm-4 mg-t-20 mg-sm-t-0">
            <label
              class="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase
              tx-sans mg-b-10">
              Address
            </label>
            <p class="tx-primary tx-rubik mg-b-0">{staffData.address}</p>
          </div>
        </div>
        <!-- row -->
      </div>
      {:else if (activeTab === "transfer")}
      <div id="tranferTab" class="tab-pane {activeTab === "transfer" ? "show active" : ""} pd-20 pd-xl-25">
        <div class="row">
          <div class="col col-sm-6">
            <form on:submit|preventDefault={handleTransfer}>
              <div class="form-group">
                <label for="to">Transfer To: </label>
                <select class="form-control" bind:value={selected} id="to">
                  <option value="">-- select ---</option>
                  {#each schools as school}
                  <option value="{school.schoolid}">{school.schoolname}</option>
                  {/each}
                </select>
              </div>
              <div class="form-group">
                <label for="to">Date: </label>
                <input class="form-control" type="date" bind:value={date} id="to">
              </div>
              <button type="submit" class="btn btn-sec">Transfer</button>
            </form>
          </div>
        </div>
      </div>
      {:else if (activeTab === "leaves")}
      <div id="tranferTab" class="tab-pane {activeTab === "leaves" ? "show active" : ""} pd-20 pd-xl-25">
        <div class="row">
          <div class="col">
            <h4 class="mb-4">Staff Leave(s)</h4>
            {#if leavesData.length > 0}
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Description</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Applied On</th>
                </tr>
              </thead>
              <tbody>
                {#each leavesData as l, i}
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{l.description}</td>
                  <td>{l.start_date}</td>
                  <td>{l.end_date}</td>
                  <td>{l.status}</td>
                  <td>{l.created_at}</td>
                </tr>
                {/each}
              </tbody>
            </table>
            {:else}
            <h4>Staff have no leaves</h4>
            {/if}
          </div>
        </div>
      </div>
      {:else if (activeTab === "queries")}
      <div id="tranferTab" class="tab-pane {activeTab === "queries" ? "show active" : ""} pd-20 pd-xl-25">
        <div class="row">
          <div class="col ">
            <h4 class="mb-4">Staff Querie(s)</h4>
            {#if queriesData.length > 0}
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Description</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {#each queriesData as q, i}
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{q.description}</td>
                  <td>{q.date}</td>
                </tr>
                {/each}
              </tbody>
            </table>
            {:else}
            <h4>Staff have no queries</h4>
            {/if}
          </div>
        </div>
      </div>
      {/if}
      <!-- tab-pane -->
    </div>
    <!-- tab-content -->
    <div class="ps__rail-x" style="left: 0px; top: 0px;">
      <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;" />
    </div>
    <div class="ps__rail-y" style="top: 0px; height: 287px; right: 0px;">
      <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 135px;" />
    </div>
  </div>
  <!-- contact-content-body -->
  {/if}
</div>
