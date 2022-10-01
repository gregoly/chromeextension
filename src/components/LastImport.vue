<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Data Collected for far</h5>
      <p></p>
      <ul class="list-group list-group-flush flex flex-col">
        <li class="list-group-item">So far this import has {{ lastImport.total }} records.</li>
        <li class="list-group-item">The last imported username {{ lastRecord.username }}.</li>
        <li class="list-group-item">The Full Name is {{ lastRecord.full_name }}.</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['lastImport'],
    computed: {
      lastRecord: {
        get() {
          if (this.lastImport.data.length == 0) {
            return {
              full_name: 'none found',
              profile_pic_url: null,
            };
          } else {
            let record = this.lastImport['data'][0];
            return record;
          }
        },
      },
    },
  };
</script>

<style>
  @import '../styles/bootstrap.min.css';
</style>
