<template>
  <div class="teaser product-teaser w-inline-block">
    <!-- <router-link @click="setCurrentProduct(record)"
    :to="{name: 'Productv2',
    params: {model:model}}" class="teaser-link">Productv2</router-link> -->
    <router-link @click="setCurrentProduct(record)"
    :to="{name: 'Product',
    params: {model:model}}" class="teaser-link">
      <div class="teaser-thumbnail-wrapper">
        <img
        :src="image"
        :alt="name"
        sizes="(max-width: 479px) 100vw, (max-width: 767px) 83vw, 180px"
        class="product-teaser-thumbnail">
        <div class="product-teaser-color-tile"></div>
        <div class="product-teaser-color-tile schweigen-in w-condition-invisible">
        </div>
      </div>
      <div class="teaser-text">
        <div class="tag-02">
          <div class="line tag-02">
          </div>
          <div class="tag-02-text">
            {{ model }}
          </div>
        </div>
        <h2
        class="heading xxs">{{ name }}</h2>
        <!-- <span class="body-text s">Perimiter Aspiration: {{ perimeterAspiration }}</span><br>
        <span class="body-text s">Variable Speed Levels: {{ variableSpeedLevels }}</span><br>
        <span class="body-text s">Balanced Aspiration: {{ balancedAspiration }}</span><br>
        <span class="body-text s">Remote Control: {{ remoteControl }}</span><br>
        <span class="body-text s">Integrated Lighting: {{ integratedLighting }}</span><br> -->
        <!-- <template v-if="finish">Finish: {{ finish }} <br></template>
        <template v-if="category">Category: {{ category }}</template>
        <template v-if="record['brand-name']"> Brand: {{ record['brand-name'] }}</template>
        <template v-if="record['dimensions-width']">
          Width: {{ record['dimensions-width'] }}</template>
        <template v-if="record['product-type']">
        Width: {{ record['product-type'] }}</template> -->

      </div>
    </router-link>
    <template>
      <div v-if="downloadsLoading && showDownloads" class="product-list-item-downloads">
        <div class="tag-02 s-m-t-8">
          <div class="tag-02-text dark">
            Downloads
          </div>
        </div>
        <Spinner></Spinner>
      </div>
    </template>
      <div v-if="(showDownloads && downloads.items.length > 0)"
        class="product-list-item-downloads">
        <div class="tag-02 s-m-t-8">
          <div class="tag-02-text dark">
            Downloads
          </div>
        </div>
        <a
          v-for="download in downloads['items']"
          :key="download"
          :href="download.fields['computed-download-url']"
          class="product-list-item-download">
            {{ download.fields.name }}
        </a>
      </div>
  </div>
</template>

<script>
import Spinner from '@/components/atoms/Spinner.vue';
// import { registerRoute } from 'workbox-routing';
// import { StaleWhileRevalidate } from 'workbox-strategies';

export default {

  name: 'ProductListItem',
  components: {
    Spinner,
  },
  props: {
    name: String,
    image: String,
    model: String,
    finish: String,
    category: Array,
    record_id: String,
    record: Object,
    showDownloads: Boolean,
  },
  data() {
    return {
      sharedState: this.store.state,
    };
  },
  computed: {
    // filterState() {
    //   if (this.active) {
    //     console.log('active');
    //   } else {
    //     console.log('inactive');
    //   }
    //   return this.active;
    // },
    perimeterAspiration() {
      return this.record['perimeter-aspiration'];
    },
    remoteControl() {
      return this.record['remote-control'];
    },
    balancedAspiration() {
      return this.record['balanced-aspiration'];
    },
    variableSpeedLevels() {
      return this.record['variable-speed-levels'];
    },
    integratedLighting() {
      return this.record['led-lights'];
    },
    loading() { return this.sharedState.products.loading; },
    downloadsLoading() {
      if (this.downloads && this.downloads.loading) {
        return true;
      } if (!this.downloads) {
        return true;
      }
      // if (this.downloads && !this.downloads.loading) {
      //   return false;
      // }
      return true;
    },
    downloads() {
      const result = { loading: true, items: [] };

      const unfilteredDownloads = this.store.state.downloads.unfiltered.records;
      // console.log(unfilteredDownloads);
      // eslint-disable-next-line prefer-destructuring
      const model = this.model;

      Object.keys(unfilteredDownloads).forEach((key) => {
        const download = unfilteredDownloads[key];
        // console.log(download.fields.name);
        const name = download.fields.name.toLowerCase();
        if (name.includes(model.toLowerCase())) {
          result.items.push(download);
        }
      });

      result.loading = false;
      return result;
    },
  },
  methods: {
    setCurrentProduct(record) {
      this.store.setCurrentProduct(record);
    },
  },
  mounted() {
    // const url = this.image;
    // registerRoute(
    //   ({ url }) => url.pathname.startsWith('/images/avatars/'),
    //   new StaleWhileRevalidate(),
    // );
  },
};
</script>

<style lang="scss" scoped>
.teaser-link {
  text-decoration:none;
  color:#000000;
  display:block;
  .product-teaser-color-tile {
    transition: width 0.25s;
    transition-timing-function: ease-out;
  }

  &:hover {
    color:#db0962;
    .heading {
      color:#db0962;
    }
    .product-teaser-color-tile {
      width:60%;
    }
  }
}
.teaser-thumbnail-wrapper {
  height:160px;
  padding:20px;
}
.product-teaser-thumbnail {
  max-height:120px;
}
.product-teaser-color-tile {
  background:#f1f1f1;
}
.product-list-item-downloads {
  .tag-03 {
    margin-bottom:4px;
  }
}
.product-list-item-download:link, .product-list-item-download:visited {
  font-size:10px;
  color:#333333;
  text-decoration:none;
  display:inline-block;
  padding:0.5em;
  background:#f6f6f6;
  margin-bottom:2px;
  border:1px solid #f1f1f1;

  &:hover {
    color:#000000;
    background:#f1f1f1;
  }
}
</style>
