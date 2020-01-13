<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let activeTab;
  export let transferData;

</script>

<div id="tranferTab" class="tab-pane {activeTab === "transfer" ? "show active" : ""} pd-20 pd-xl-25">
  <div class="d-flex align-items-center justify-content-between mg-b-25">
    <h4 class="mb-4">Staff Tranfer(s)</h4>
    <div class="d-flex">
      <button 
        class="btn btn-sm btn-sec" 
        on:click={() => dispatch('modal-open', 'transfer') }
      >Transfer Staff</button>
    </div>
  </div>
  <div class="row">
    <div class="col">
      {#if transferData.length > 0}
      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>FROM</th>
            <th>TO</th>
            <th>Time</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
        {#each transferData as data, i}
          <tr>
            <td>{i + 1}</td>
            <td>{data.originating_school}</td>
            <td>{data.destination_school}</td>
            <td>{data.time}</td>
            <td>{data.status}</td>
            <td>{data.created_at}</td>
          </tr>
        {/each}
        </tbody>
      </table>
      {/if}
    </div>
  </div>
</div>