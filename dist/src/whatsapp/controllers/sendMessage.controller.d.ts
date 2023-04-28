import { InstanceDto } from '../dto/instance.dto';
import { SendAudioDto, SendButtonDto, SendContactDto, SendListDto, SendLocationDto, SendMediaDto, SendReactionDto, SendTextDto } from '../dto/sendMessage.dto';
import { WAMonitoringService } from '../services/monitor.service';
export declare class SendMessageController {
    private readonly waMonitor;
    constructor(waMonitor: WAMonitoringService);
    sendText({ instanceName }: InstanceDto, data: SendTextDto): Promise<import("@codechat/base").proto.WebMessageInfo>;
    sendMedia({ instanceName }: InstanceDto, data: SendMediaDto): Promise<import("@codechat/base").proto.WebMessageInfo>;
    sendWhatsAppAudio({ instanceName }: InstanceDto, data: SendAudioDto): Promise<import("@codechat/base").proto.WebMessageInfo>;
    sendButtons({ instanceName }: InstanceDto, data: SendButtonDto): Promise<import("@codechat/base").proto.WebMessageInfo>;
    sendLocation({ instanceName }: InstanceDto, data: SendLocationDto): Promise<import("@codechat/base").proto.WebMessageInfo>;
    sendList({ instanceName }: InstanceDto, data: SendListDto): Promise<import("@codechat/base").proto.WebMessageInfo>;
    sendContact({ instanceName }: InstanceDto, data: SendContactDto): Promise<import("@codechat/base").proto.WebMessageInfo>;
    sendReaction({ instanceName }: InstanceDto, data: SendReactionDto): Promise<import("@codechat/base").proto.WebMessageInfo>;
}
