<%--
@Project Name: vue-admin
@Author: luichooy
@Date: 2018-04-02 10:13
@Email: luichooy@163.com
@Idea: WebStorm
--%>

<template>
  <el-card>
    <el-row>
      <span class="spanDiv"> 组织 :</span>
      <el-select :value="valueTitle" :clearable="clearable" @clear="clearHandle">
        <el-option :value="valueTitle" :label="valueTitle">
          <el-tree id="tree-option"
                   ref="selectTree"
                   :accordion="accordion"
                   :data="options"
                   :props="props"
                   :node-key="props.value"
                   :default-expanded-keys="defaultExpandedKey"
                   @node-click="handleNodeClick">
          </el-tree>
        </el-option>
      </el-select>
      <span class="spanDiv"> 创建时间 :</span>
      <el-date-picker type="date" placeholder="开始时间" v-model="searchForm.startTimeStr" style="width: 10%;"
                      value-format="yyyy-MM-dd"></el-date-picker>
      &nbsp;&nbsp;-&nbsp;&nbsp;
      <el-date-picker placeholder="结束时间" v-model="searchForm.endTimeStr" style="width: 10%;"
                      value-format="yyyy-MM-dd"></el-date-picker>
      <span class="spanDiv"> 文件类型 :</span>
      <el-select v-model="searchForm.sqlCode" clearable>
        <el-option
          v-for="(item,index) in fileTypeList"
          :key="index"
          :label="item.label"
          :value="item.value"
        style="text-align: center">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="search" @keyup.enter.native="search" style="margin-left: 1%">查询</el-button>
      <el-button type="success" icon="el-icon-upload2" @click="upload">上传</el-button>
    </el-row>
    <el-row>
      <el-table
        :data='tableData'
        border
        stripe
      style="margin: 2% 0">
        <el-table-column label="文件名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="文件类型" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.fileType}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" width="250px">
          <template slot-scope="scope">
            <span>{{ scope.row.createtime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createusername}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 16px; text-align:right;"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[5, 10, 15, 20]"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </el-row>
    <el-dialog :visible.sync="uploadVisible" title="上传" :modal="false" custom-class="user-details" align="center"
               top="5%">
      <!-- <span>这是一段信息</span> -->
      <el-form label-position="right" label-width="130px">
        <el-form-item label="选择本地文件" align="left">
          <el-input placeholder="请输入内容" v-model="filename" readonly class="form_text" disabled>
            <el-upload slot="append" class="upload-demo" :show-file-list="false"
                       :auto-upload="false" :on-change="handleChange"
                       :action="url" :data="uploadFrom" ref="upload"
                       :on-success="uploadSuccess" :multiple="multiple"
                       :file-list="fileList">
              <el-button size="small" type="primary">选择文件</el-button>
            </el-upload>
          </el-input>
        </el-form-item>
        <el-form-item label="文件名称" align="left" prop="name">
          <el-input v-model="uploadFrom.name" class="form_text" clearable></el-input>
        </el-form-item>
        <el-form-item label="所属组织" align="left">
          <el-select :value="valueTitle" :clearable="clearable" @clear="clearHandle">
            <el-option :value="valueTitle" :label="valueTitle">
              <el-tree id="upload-tree-option"
                       ref="selectTree"
                       :accordion="accordion"
                       :data="options"
                       :props="props"
                       :node-key="props.value"
                       :default-expanded-keys="defaultExpandedKey"
                       @node-click="handleNodeClick">
              </el-tree>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" align="left" prop="description">
          <el-input type="textarea" v-model="uploadFrom.description" class="form_text" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" icon="el-icon-upload2" @click="saveUpload" v-loading="uploadLoading"
                   element-loading-text="正在上传数据...">上传</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
  import { getTreeData } from 'src/api/data/orgManage/index'

  import { selectByDptIdAndTime } from 'src/api/data/file/index'

  export default {
    watch: {
      value() {
        this.valueId = this.value
        this.initHandle()
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    created () {
      this.getTreeData();
      this.initHandle();
      var _self = this;
      var key;
      document.onkeydown = function(e) {
        if (window.event === undefined) {
          key = e.keyCode;
        } else {
          key = window.event.keyCode;
        }
        if (key === 13) {
          _self.search();
        }
      }
    },
    name: 'el-tree-select',
    props: {
      /* 配置项 */
      props: {
        type: Object,
        default: () => {
          return {
            value: 'id',             // ID字段名
            label: 'label',         // 显示名称
            children: 'children'    // 子级字段名
          }
        }
      },
      /* 初始值 */
      value: {
        type: Number,
        default: () => {
          return null
        }
      },
      /* 可清空选项 */
      clearable: {
        type: Boolean,
        default: () => {
          return true
        }
      },
      /* 自动收起 */
      accordion: {
        type: Boolean,
        default: () => {
          return false
        }
      }
    },
    data() {
      return {
        options: undefined,
        tableData: undefined,
        searchForm: {
          dptId: undefined,
          sqlCode: undefined,
          startTimeStr: undefined,
          endTimeStr: undefined,
          pagesize: 10,
          currentpage: 1
        },
        fileTypeList: [
          {
            label: '项目模型文件',
            value: 1
          },
          {
            label: '项目文件',
            value: 2
          }
        ],
        uploadVisible: false,
        filename: undefined,
        uploadFrom: {
          name: undefined,
          dptId: undefined,
          description: undefined,
          file: undefined
        },
        total: undefined,
        optionsData: [],
        url: this.SERVER + 'file/upload',
        pagesize: undefined,
        currentpage: undefined,
        multiple: true,
        fileList: [],
        valueId: this.value,    // 初始值
        valueTitle: '',
        defaultExpandedKey: [],
        uploadLoading: false
      }
    },
    methods: {
      getTreeData() {
        if (this.user === undefined || this.user === null) {
          this.offLine()
        } else {
          this.uploadFrom.createuser = this.user.usrId
          getTreeData(this.user.usrId).then(res => {
            if (res.code === 0) {
              this.options = res.result
            }
          })
        }
      },
      search() {
        console.log(this.searchForm)
        if (this.searchForm.dptId === undefined || this.searchForm.sqlCode === undefined) {
          this.$message({
            message: '请选择组织和文件类型后再查询!',
            type: 'warning'
          });
        } else {
          selectByDptIdAndTime(this.searchForm).then(res => {
            if (res.code === 0) {
              this.tableData = res.result.list
              this.total = res.result.total
            }
          })
        }
      },
      upload() {
        this.uploadVisible = true
      },
      uploadSuccess(response, file, fileList) {
        console.log(response)
        if (response.code === 0) {
          this.$message({message: '文件上传成功', type: 'success'});
          this.closeUpload();
        }
      },
      closeUpload() {
        this.uploadVisible = false
      },
      saveUpload() {
        this.$refs.upload.submit()
      },
      handleChange(file, fileList) {
        this.fileList = [fileList[fileList.length - 1]]
        this.uploadFrom.file = undefined
        this.filename = file.name
        this.uploadFrom.file = file
        if (file.name.indexOf('.') !== -1) {
          this.uploadFrom.name = file.name.split('.')[0]
        } else {
          this.uploadFrom.name = file.name
        }
        this.testFile(file)
      },
      testFile(file) {
        const isLt2M = file.size / 1024 / 1024 < 1024 * 4
        if (!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 4G!',
            type: 'warning'
          });
        }
      },
      offLine() {
        if (this.$store.state.user === undefined || this.$store.state.user === null) {
          this.$confirm('登录已经过期，请重新登录？', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          })
            .then(() => {
              this.$store.commit('SET_TOKEN', '');
              this.$store.commit('SET_USER', null);
              this.$router.replace({path: '/login'});
            })
            .catch(() => {
              return false;
            })
        }
      },
      handleSizeChange(value) {
        this.pagesize = value;
        this.search();
      },
      handleCurrentChange(value) {
        this.currentpage = value;
        this.search();
      },
      // 初始化值
      initHandle() {
        if (this.valueId) {
          this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[this.props.label]     // 初始化显示
          this.$refs.selectTree.setCurrentKey(this.valueId)       // 设置默认选中
          this.defaultExpandedKey = [this.valueId]      // 设置默认展开
        }
        this.$nextTick(() => {
          let scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
          let scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
          scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
          scrollBar.forEach(res => {
            res.style.width = 0
          })
        })
      },
      // 切换选项
      handleNodeClick(node) {
        this.valueTitle = node[this.props.label]
        this.valueId = node[this.props.value]
        this.searchForm.dptId = this.valueId
        this.uploadFrom.dptId = this.valueId
        this.$emit('getValue', this.valueId)
        this.defaultExpandedKey = []
      },
      // 清除选中
      clearHandle() {
        this.valueTitle = ''
        this.valueId = null
        this.defaultExpandedKey = []
        this.clearSelected()
        this.$emit('getValue', null)
      },
      /* 清空选中样式 */
      clearSelected() {
        let allNode = document.querySelectorAll('#tree-option .el-tree-node')
        allNode.forEach((element) => element.classList.remove('is-current'))
      }
    }
  };
</script>
<style scoped>
  .el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
  }

  .el-select-dropdown__item.selected {
    font-weight: normal;
  }

  ul li > > > .el-tree .el-tree-node__content {
    height: auto;
    padding: 0 20px;
  }

  .el-tree-node__label {
    font-weight: normal;
  }

  .el-tree > > > .is-current .el-tree-node__label {
    color: #409EFF;
    font-weight: 700;
  }

  .el-tree > > > .is-current .el-tree-node__children .el-tree-node__label {
    color: #606266;
    font-weight: normal;
  }
  .spanDiv{
    margin-left: 1%;
    font-size: medium;
  }
</style>
