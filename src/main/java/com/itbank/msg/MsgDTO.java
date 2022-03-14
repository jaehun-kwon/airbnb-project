package com.itbank.msg;

import java.sql.Date;
import java.text.SimpleDateFormat;

public class MsgDTO {
	private int idx;
	private Date send_date;
	private String recipient, sender, content, send_file;
	
	
	
	@Override
	public String toString() {
		return "MsgDTO [idx=" + idx + ", send_date=" + send_date + ", recipient=" + recipient + ", sender=" + sender
				+ ", content=" + content + ", send_file=" + send_file + "]";
	}
	
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
	}
	
	public Date getSend_date() {
		return send_date;
	}
	
	public String getSend_date_year() {
		String ret = "";
		SimpleDateFormat sdf = new SimpleDateFormat("YYYY년 MM월 dd일");
		ret = sdf.format(send_date);
		return ret;
			
	}
	
	public String getSend_date_time() {
		String ret = "";
		SimpleDateFormat sdf = new SimpleDateFormat("aa hh : mm");
		ret = sdf.format(send_date);
		return ret;
	}
	public void setSend_date(Date send_date) {
		this.send_date = send_date;
	}
	public String getRecipient() {
		return recipient;
	}
	public void setRecipient(String recipient) {
		this.recipient = recipient;
	}
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getSend_file() {
		return send_file;
	}
	public void setSend_file(String send_file) {
		this.send_file = send_file;
	}
	
	
}
