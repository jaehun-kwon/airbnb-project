package com.itbank.chat;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.itbank.service.MsgService;

@Component
public class ChatComponent extends TextWebSocketHandler {

	@Autowired
	private MsgService ms;

	private List<WebSocketSession> sessionList = new ArrayList<WebSocketSession>();
	private ObjectMapper mapper = new ObjectMapper();

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessionList.add(session);
	}

	@Override // 메세지를 받으면 서버가 수행되는 메서드
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		@SuppressWarnings("unchecked")
		HashMap<String, String> payload = mapper.readValue(message.getPayload(), HashMap.class);
		System.out.println(payload);
		if (payload.get("recipient") != null) {

			for (WebSocketSession wss : sessionList) {
				boolean flag = wss.getId().contains(payload.get("recipient"))
						|| wss.getId().contains(payload.get("sender"));
				if (flag) {
					wss.sendMessage(new TextMessage(message.getPayload()));
				}
			}
			ms.insertMsg(payload);
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessionList.remove(session);
	}

}
