import { Component, Input, OnInit } from '@angular/core';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import {
  getAemDamFullPath,
  replaceSpaceWithHyphen,
} from '../../../utils/utils';
import { CommonService } from '../shared/services/common.service';
import { ChatBotDialogComponent } from './chat-bot-dialog/chat-bot-dialog.component';
import {
  bannerPageTitle,
  btnFeedbackNps,
  homePageDetails,
  pageTitle,
} from './constant';
import { NavigationService } from '../navigation/navigation.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  fileReference = getAemDamFullPath(
    '/content/dam/my-ai/home-page/Home-Banner.jpg'
  );

  pageTitle = pageTitle;

  bannerPageTitle = bannerPageTitle;

  btnFeedbackNps = btnFeedbackNps;

  altText = 'Banner Image';

  chatBoatIconPath: string;

  linkUrl = '';

  homePageDetails = homePageDetails;

  awardsAndAppreciationsLabels: {
    title: string;
    ctaText: string;
    noDataText: string;
  };

  showNPSbutton: boolean = true;

  constructor(
    public dialog: NgDialogAnimationService,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    // this.homeService.getAEMKeys().subscribe((data) => {
    //   this.homePageDetails = data.homePageDetails;
    // });

    this.chatBoatIconPath = getAemDamFullPath(
      '/content/dam/my-ai/chat-bot/Chatbot.png'
    );
  }

  openChatbotDalog() {
    this.dialog.open(ChatBotDialogComponent, {
      animation: {
        to: 'top',
      },
      autoFocus: false,
      width: '390px', // Set your desired width
      height: '600px', // Set your desired
      position: {
        bottom: '0',
        right: '0',
      },
      panelClass: 'chat-bot-dialog',
    });
  }
}
