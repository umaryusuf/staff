<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let activeTab;
  export let queriesData;
</script>


<div id="tranferTab" class="tab-pane {activeTab === "queries" ? "show active" : ""} pd-20 pd-xl-25">
  <div class="d-flex align-items-center justify-content-between mg-b-25">
    <h4 class="mb-4">Staff Querie(s)</h4>
    <div class="d-flex">
      <button class="btn btn-sm btn-sec" on:click={() => dispatch('modal-open', 'query') }>Add Query</button>
    </div>
  </div>
  <div class="row">
    <div class="col">
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