import { BiddingWindow } from './bidding-window.interface';
import { CrewGroup } from './crew-group.interface';

export interface CrewDetails {
  crewId: string;
  eligibleLayovers: string[] | null;
  recentSearchedLayover: string[] | null;
  crewGroups: CrewGroup[];
  biddingWindowList: BiddingWindow[];
  existingBids: any[];
  activeBiddingWindow: BiddingWindow;
}
