package com.itbank.service;

import java.io.File;
import java.io.FileInputStream;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.itbank.component.UploadDTO;
import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpException;

@Service
public class UploadService {
	
	private final String serverIP = "192.168.10.100";
	private final int serverPort = 22;
	private final String serverUser = "root";
	private final String serverPass = "1";
	private ChannelSftp chSftp = null;

	public String upload(UploadDTO dto) throws Exception {
		MultipartFile file = dto.getUploadFile();
		File dest = new File(file.getOriginalFilename());
		file.transferTo(dest);
		
		Session sess = null;
		Channel channel = null;
		JSch jsch = new JSch();
		sess = jsch.getSession(serverUser, serverIP, serverPort);
		sess.setPassword(serverPass);
		sess.setConfig("StrictHostKeyChecking", "no");
		sess.connect();
		
		System.out.println("sftp > connected");

		channel = sess.openChannel("sftp");
		channel.connect();
		
		chSftp = (ChannelSftp) channel;
		
		FileInputStream fis = new FileInputStream(dest);
		String dir = "/var/www/html" + (dto.getUploadFileDir() == null ? "" : "/" + dto.getUploadFileDir());
				
		boolean exists = mkdir(chSftp, dir);
		if(exists != true) {chSftp.mkdir(dir);}
		
		chSftp.cd(dir);
		chSftp.put(fis, dest.getName());
		System.out.println("sftp > transfer complete");
		
		fis.close();
		chSftp.exit();
		
		String uploadFilePath = "";
		uploadFilePath += "http://";
		uploadFilePath += "175.214.170.244";
		uploadFilePath += ":20000";
		uploadFilePath += dto.getUploadFileDir() == null ? "" : "/" + dto.getUploadFileDir();
		uploadFilePath += "/" + dest.getName();
		
		dto.setUploadFilePath(uploadFilePath);
		
		dest.delete();
		return dto.getUploadFilePath();
	}
	
	public boolean mkdir(ChannelSftp chSftp, String dir) {
		boolean result = false;
		
		try {
			chSftp.cd(dir);
			result = true;
		} catch (SftpException e) {
			result = false;
		}
		
		return result;
	}
}
