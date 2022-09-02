# 한번에 투명도랑 같이 영상 저장이 안돼서 일단 이미지로 다운받고 ffmpeg -i %05d.png output.webm 명령어로 투명영상으로 합성해야 한다. 영상퀄리티가 떨어진다싶으면 추가옵션 ㄱㄱ

import numpy as np
import cv2
import math
import os
import sys
import subprocess
from moviepy.editor import *

filenames = sys.argv[1:]
print("filenames", filenames)
for filename in filenames:
    pre_filename = filename.split('.')[0]
    os.system("mkdir " + pre_filename)

    path = os.path.realpath(__file__);
    dirPath = path.split(__file__)[0];
    videoPath = os.path.join(dirPath, filename)
    backgroundPath = os.path.join(dirPath, "future.png")
    cap1 = cv2.VideoCapture(videoPath)

    if not cap1.isOpened():
        print('video open failed')
        sys.exit()

        
    w = math.floor(cap1.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = math.floor(cap1.get(cv2.CAP_PROP_FRAME_HEIGHT))
    frame_cnt1 = math.floor(cap1.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_cnt2 = math.floor(cap1.get(cv2.CAP_PROP_FRAME_COUNT))
    # fps = math.floor(cap1.get(cv2.CAP_PROP_FPS))
    # print("fps:", fps)


    # delay = int(1000 / fps)

    do_composit = True

    return_frames = []

    transparent = np.zeros((h, w, 4), np.uint8)

    imgIdx = 0

    while True:
        ret1, frame1 = cap1.read()
        if not ret1:
            break
        if do_composit:
            frame1 = cv2.cvtColor(frame1, cv2.COLOR_BGR2BGRA)
            hsv = cv2.cvtColor(frame1, cv2.COLOR_BGR2HSV)
            mask = cv2.inRange(hsv, (30,50,50), (90,255,255))
            cv2.copyTo(transparent, mask, frame1)
                    
        # cv2.imshow('frame', frame1)
        img_rgba = cv2.cvtColor(frame1, cv2.COLOR_BGRA2RGBA)
        hsv = cv2.cvtColor(frame1, cv2.COLOR_BGR2HSV)
        
        # key = cv2.waitKey(delay)
        
        cv2.imwrite(os.path.join(dirPath,pre_filename, '{0:05d}.png'.format(imgIdx)), frame1)
        # cv2.imwrite(os.path.join(dirPath,'output', '{0:05d}.png'.format(imgIdx)), frame1)
        
        imgIdx += 1
        
        # if key == ord(' '):
        #     do_composit = not do_composit
        # elif key == 27:
        #     break
        
    cap1.release()
    cv2.destroyAllWindows()

    # subprocess.run(["cd " + pre_filename, "ffmpeg -i %05d.png output.webm"])
    # ffmpeg -i video.mp4 -f mp3 -ab 192000 -vn music.mp3
    os.system("ffmpeg -i " + filename + " -f mp3 -ab 192000 -vn " + pre_filename + ".mp3")
    os.system("ffmpeg -framerate 30 -i " + "./" + pre_filename + "/" +  "%05d.png -i " + pre_filename + ".mp3 -strict -2 -c:v libvpx -pixel_format yuva420 -auto-alt-ref 0 " + pre_filename + ".webm")

    # print(return_frames)

    # result_video_single = os.path.join(dirPath , 'output.webm')
    # videoClip = VideoFileClip(videoPath)
    # audioClip = videoClip.audio
    # save_clip_single = ImageSequenceClip(return_frames, fps=fps)
    # print(save_clip_single)
    # save_clip_single = save_clip_single.set_audio(audioClip)
    # save_clip_single.write_videofile(result_video_single, temp_audiofile="audio_" + os.path.basename(result_video_single), remove_temp=True, audio_codec='libvorbis', fps=fps, withmask=True)
