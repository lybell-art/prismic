# Prismic
<img width="1280" alt="prismic_screenshot" src="https://github.com/lybell-art/prismic/assets/32293736/234ff653-b50d-4342-81b3-51bb461a1a20">

**Prismic**은 **수많은 사진들을 빠르고 쉽게 분류할 수 있는 유틸리티 웹 어플리케이션**입니다. 사진 관련 인공지능 학습을 할 때 유용하게 사용할 목적으로 제작되었으며, 목적의 특성상 1000개 이상의 대규모의 사진도 성능 저하 없이 분류할 수 있습니다.

사용 방법은 간단합니다. 우선 분류할 이미지들을 첨부한 뒤, 이미지들의 클래스를 만들고, 미리보기로 띄워지는 이미지를 보면서 클래스 버튼을 누르면 됩니다. 분류가 완료된 이미지들은 zip 형태로 저장됩니다. 추가로 현재까지 분류했던 이미지들의 목록을 가상 리스트 형태로 볼 수 있습니다.

## How to use

1. 분류할 이미지를 로컬에서 불러옵니다. 패널을 클릭해서 불러오거나, 이미지를 끌어올 수도 있습니다.
2. 클래스를 추가합니다. 아래 Add Class 버튼으로 클래스를 추가하며, 최대 9개의 클래스를 추가할 수 있습니다. 왼쪽 키 버튼을 눌러 단축키를 지정할 수 있고, 중앙 텍스트를 눌러 클래스의 이름을 변경할 수 있습니다. 오른쪽 휴지통 버튼으로 클래스를 제거할 수 있습니다.
3. 이미지가 중앙 화면에 순서대로 표시됩니다. 하단 버튼을 누르거나, 단축키를 눌러서 이미지를 분류할 수 있습니다. 어느 클래스에도 속하지 않은 이미지는 Discard 버튼을 누르거나, 백스페이스 키/delete키를 눌러 이미지를 휴지통으로 보낼 수 있습니다.
4. 분류된 이미지는 메뉴의 Directories에서 볼 수 있습니다. 썸네일 이미지를 눌러 클래스를 다시 지정할 수 있습니다.
5. 마지막 이미지가 분류되면, 결과가 zip 파일로 저장됩니다. 패널을 클릭해 다운로드받을 수 있습니다.

## Try this!

[lybell-art.github.io/prismic](https://lybell-art.github.io/prismic)
