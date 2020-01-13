<script>
  import { onMount } from 'svelte';
  import { notifier } from '@beyonk/svelte-notifications';
  import { URL, handleError } from '../../helpers';

  let dashboard = null;

  onMount(() => {
    fetch(`${URL}/staff/dashboard`, {
      headers: {
        authorization: localStorage.getItem('auth-token')
      }
    })
    .then(res => res.json())
    .then(data => {
      notifier.success(data.message);
      dashboard = data.data;
      console.log(data.data);
    })
    .catch(error => handleError(error));
  });

</script>


<section class="content-body">
  <div class="container pd-x-0">

    <div class="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-25 mg-xl-b-30">
      <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb breadcrumb-style1 mg-b-10">
            <li class="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
            <li class="breadcrumb-item active" aria-current="page">Staff</li>
          </ol>
        </nav>
        <h4 class="mg-b-0 tx-spacing--1">Welcome to Staff Dashboard</h4>
      </div>
      <div class="d-none d-md-block">
        <a href="/dashboard/staff" class="btn btn-sm pd-x-15 btn-white btn-uppercase">
          <i data-feather="mail" class="wd-10 mg-r-5"></i> All Staff
        </a>
        <a href="/dashboard/new-staff" class="btn btn-sm pd-x-15 btn-sec btn-uppercase mg-l-5">
          <i data-feather="file" class="wd-10 mg-r-5"></i> Create New Staff
        </a>
      </div>
    </div>
    <!-- begin row -->
    <div class="row row-xs">
      <div class="col-sm-6 col-lg-3">
        <div class="card card-body">
          <h6 class="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">Staff</h6>
          <div class="d-flex d-lg-block d-xl-flex align-items-end">
            <h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">{(dashboard === null) ? "": dashboard.all_staff}</h3>
            <p class="tx-11 tx-color-03 mg-b-0"><span class="tx-medium tx-success">1.2% <i class="icon ion-md-arrow-up"></i></span></p>
          </div>
          <div class="chart-three">
              <div id="flotChart3" class="flot-chart ht-30"></div>
            </div><!-- chart-three -->
        </div>
      </div><!-- col -->
      <div class="col-sm-6 col-lg-3 mg-t-10 mg-sm-t-0">
        <div class="card card-body">
          <h6 class="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">Tenured Teaching Staff</h6>
          <div class="d-flex d-lg-block d-xl-flex align-items-end">
            <h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">{(dashboard === null) ? "": dashboard.tenured_teaching}</h3>
            <p class="tx-11 tx-color-03 mg-b-0"><span class="tx-medium tx-success">0.7% <i class="icon ion-md-arrow-up"></i></span></p>
          </div>
          <div class="chart-three">
            <div id="flotChart4" class="flot-chart ht-30"></div>
          </div><!-- chart-three -->
        </div>
      </div><!-- col -->
      <div class="col-sm-6 col-lg-3 mg-t-10 mg-lg-t-0">
        <div class="card card-body">
          <h6 class="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">Tenured Non-Teaching</h6>
          <div class="d-flex d-lg-block d-xl-flex align-items-end">
            <h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">{(dashboard === null) ? "": dashboard.tenured_non_teaching}</h3>
            <p class="tx-11 tx-color-03 mg-b-0"><span class="tx-medium tx-success">0.3% <i class="icon ion-md-arrow-up"></i></span></p>
          </div>
          <div class="chart-three">
            <div id="flotChart5" class="flot-chart ht-30"></div>
          </div><!-- chart-three -->
        </div>
      </div><!-- col -->
      <div class="col-sm-6 col-lg-3 mg-t-10 mg-lg-t-0">
        <div class="card card-body">
          <h6 class="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">Non-Tenured Staff</h6>
          <div class="d-flex d-lg-block d-xl-flex align-items-end">
            <h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">{(dashboard === null) ? "": dashboard.non_tenured}</h3>
            <p class="tx-11 tx-color-03 mg-b-0"><span class="tx-medium tx-success">2.1% <i class="icon ion-md-arrow-up"></i></span></p>
          </div>
          <div class="chart-three">
            <div id="flotChart6" class="flot-chart ht-30"></div>
          </div><!-- chart-three -->
        </div>
      </div><!-- col -->
    </div> <!--end row-->
  </div>
</section>