import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Inject } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';

import * as $ from 'jquery';
import { isTemplateRef } from 'ng-zorro-antd/core/util';
import { from } from 'rxjs';
import { User } from '../passport/login/login.model';
import { ChatMessage } from './chat.model';
import { ChatService } from './chat.service';

declare const CIMPushManager: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {

  selected = 0; // 当前选中的会话

  onlyRead = false;


  hasMoreMsg = true;

  pageNum = 1; // 历史消息分页参数

  pageSize = 10; // 历史消息分页参数

  searchWd = ''; // 搜索关键字

  chatList = []; // 聊天成员列表

  sendMsg = ''; // 发送消息绑定内容

  adminInfo: User = new User(); // 当前登录用户信息

  chatUser: User = new User(); // 当前聊天对象

  unread = []; // 未读消息

  read = []; // 已读消息


  constructor(private http: _HttpClient, private chatService: ChatService, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    const userNames = tokenService.get().name;
    const params: any = { userName: userNames };
    this.chatService.getUserByUserName(params).subscribe(res => {
      this.adminInfo = res.body;
      this.adminInfo.userAvatar = environment.fileDownPath + this.adminInfo.userAvatar;
    });
  }



  ngOnInit(): void {
    this.initSocket();
    this.getChatList();
  }

  /**
   * 
   * 获取聊天成员列表
   */
  getChatList() {
    this.chatService.getUserList().subscribe(res => {
      if (res.body && res.body.length > 0) {
        this.chatList = res.body.filter(item => item.username !== this.adminInfo.username);
        this.chatList.forEach(user => {
          user.userAvatar = environment.fileDownPath + user.userAvatar;
        });
        this.chatUser = this.chatList[0];
      }
    });
  }

  /**
   * 
   * 展开聊天
   * @param item 聊天对象
   * @param idx 对象索引
   */
  showChat(item: User, idx) {
    this.selected = idx;
    this.chatUser = item;
    // 获取聊天记录
  }

  /**
   * 
   * 搜索聊天列表
   */
  search() {

  }


  /**
   * 初始化socket
   */
  initSocket() {
    // 加载js
    $.getScript('assets/cim/replybody.js', (replaybody) => {
      $.getScript('assets/cim/sentbody.js', (sentbody) => {
        $.getScript('assets/cim/cim.web.sdk.js', (wsSdk) => {
          $.getScript('assets/cim/message.js', (message) => {
            CIMPushManager.connect();
            /**
             * 
             * socket链接成功回调
             */
            CIMPushManager.onConnectFinished = () => {
              // 绑定当前登录的用户
              CIMPushManager.bindAccount(this.adminInfo.username);
            };

            /**
             * 
             * @param reply 客户端链接后服务端发送的绑定成功消息
             */
            CIMPushManager.onReplyReceived = (reply) => {
              console.log(reply);
            };
            /**
             * 
             * @param data 收到消息回调
             */
            CIMPushManager.onInterceptMessageReceived = (data) => {
              console.log(data);
              this.read.push({ content: data.content, type: '0' });
            };
          });
        });
      });
    });
  }

  /**
   * 发送消息
   */
  send() {
    const message = new ChatMessage();
    message.action = '2';
    message.content = this.sendMsg;
    message.sender = this.adminInfo.username;
    message.receiver = this.chatUser.username;
    message.format = '0';
    this.chatService.sendMessage(message).subscribe(res => {
      this.read.push({ content: this.sendMsg, type: '1' });
      this.sendMsg = '';
    });
  }

}
