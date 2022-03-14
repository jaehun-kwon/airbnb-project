package com.itbank.component;

import org.springframework.web.multipart.MultipartFile;

public class UploadDTO {
	private MultipartFile uploadFile;
	private String uploadFilePath;
	private String uploadFileDir;
	
	public String getUploadFileDir() {
		return uploadFileDir;
	}
	public void setUploadFileDir(String uploadFileDir) {
		this.uploadFileDir = uploadFileDir;
	}
	public MultipartFile getUploadFile() {
		return uploadFile;
	}
	public void setUploadFile(MultipartFile uploadFile) {
		this.uploadFile = uploadFile;
	}
	public String getUploadFilePath() {
		return uploadFilePath;
	}
	public void setUploadFilePath(String uploadFilePath) {
		this.uploadFilePath = uploadFilePath;
	}
}
