<template>
  <div class="navbar">
    <div id="hamburger-container" class="hamburger-container" @click="toggleSideBar">
      <i class="el-icon-s-unfold" :class="{'is-active':sidebar.opened}" />
    </div>
    <el-dropdown class="avatar-container" trigger="hover">
      <div class="avatar-wrapper">
        <img :src="$images.avatar" class="user-avatar">
      </div>
      <el-dropdown-menu slot="dropdown">
        <router-link to="/profile/index">
          <el-dropdown-item>Profile</el-dropdown-item>
        </router-link>
        <router-link to="/">
          <el-dropdown-item>Dashboard</el-dropdown-item>
        </router-link>
        <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
          <el-dropdown-item>Github</el-dropdown-item>
        </a>
        <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
          <el-dropdown-item>Docs</el-dropdown-item>
        </a>
        <el-dropdown-item divided @click.native="logout">
          <span style="display:block;">Log Out</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 0.25rem;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
    .is-active {
      transform: rotate(180deg);
    }
  }

  .avatar-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .avatar-wrapper {
      cursor: pointer;
      width: 42px;
      height: 42px;
      margin-right: 14px;
      border-radius: 50%;
      box-shadow: #f09b57 0px 0px 7px 0;
      border: 2px inset #f09b57;

      .user-avatar {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
