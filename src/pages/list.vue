<template>
  <div class="list">
    <app-loadding :isHide="isUser"/>
    <section class="list__section">
      <h1>ListPage</h1>
      <add-button/>
    </section>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import AppLoadding from '~/components/simple/app-loading'
import AddButton from '~/components/simple/add-button'

export default {
  layout: "default",
  components: {
    AppLoadding,
    AddButton
  },
  methods: {
    getFireStoreData: async function() {
      const data = await firebase.firestore().collection('test').get().catch((err) => console.log(err));
      await data.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.data());
      });
    },
    updateFireStoreData: async function(collectionName, docName) {
      const target = firebase.firestore().collection(collectionName).doc(docName);
      await target.update({ test: true }).catch((err) => console.log(err))
      await console.log('update success');
    },
    setFireStoreData: async function(docName) {
      const docRef = await firebase.firestore().collection('test').doc(docName).set({
        first: 'hello',
        last: 'world',
        born: 1815
      }).catch((err) => console.log("Error adding document: ", err));
      await console.log("Document written with ID: ", docRef.id);
    },
  },
  data() {
    return {
      isUser: false,
      user: {}
    };
  },
  mounted() {
    this.isUser = this.$store.getters['user/isUser'];
    if (!this.isUser) {
      firebase.auth().onAuthStateChanged((result) => {
        if (result) {
          this.isUser = true;
          this.user = result;
          this.getFireStoreData();
        } else {
          this.$router.push("/sign-in");
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.list {
  &__section {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height: calc(100vh - (#{$app-header-height + $app-footer-height}));
  }
}
</style>
