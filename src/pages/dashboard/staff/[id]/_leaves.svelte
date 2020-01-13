<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let activeTab;
  export let leavesData;
</script>


<div id="tranferTab" class="tab-pane {activeTab === "leaves" ? "show active" : ""} pd-20 pd-xl-25">
  <div class="d-flex align-items-center justify-content-between mg-b-25">
    <h4 class="mb-4">Staff Leave(s)</h4>
    <div class="d-flex">
      <button 
      class="btn btn-sm btn-sec" 
      on:click={() => dispatch('modal-open', 'leave')}
      >Request Leave</button>
    </div>
  </div>
  <div class="row">
    <div class="col">
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