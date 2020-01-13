<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let modalActive;

</script>

<div class="modal {(modalActive === 'query') ? "fade show": ""}" 
  id="modal1" tabindex="-1" role="dialog" 
  aria-labelledby="enableeditmodal" 
  style="display: { (modalActive === 'query') ? "block": "none"};" 
  aria-modal="true"
>
  <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
    <div class="modal-content tx-14">
      <div class="modal-header bg-darker ">
        <h6>Add Query</h6>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span class="close-modal" on:click={() => dispatch('close-modal', 'queries')} aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <form action="">
          <div class="form-group">
            <label for="time">Time</label>
            <select id="time" class="form-control">
              <option value="">-- select time --</option>
              <option value="1 day">1 Day</option>
              <option value="2 days">2 Days</option>
              <option value="3 days">3 Days</option>
              <option value="1 week">1 Week</option>
            </select>
          </div>
          <button class="btn btn-sec btn-block">Grant Edit Access</button>
        </form>
      </div>
    </div>
  </div>
</div>