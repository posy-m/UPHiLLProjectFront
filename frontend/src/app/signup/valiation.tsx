// 유효성 검사
"use client"

export async function Valiation(formData: FormData, fieldName?: string) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const checkPassword = formData.get("checkPassword") as string;
  // const nickName = formData.get("nickName") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const birthDate = formData.get("birthDate") as string;

  // 추가: 날짜 유효성 검사


  // Validate only the specified field if provided
  if (fieldName) {
    switch (fieldName) {
      case 'email':
        // const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        if (!email.includes('@')) {
          throw new Error("잘못된 이메일 형식입니다.");
        }
        break;

      case 'password':
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
        if (!passwordRegex.test(password)) {
          // throw new Error("비밀번호 (영문+숫자+특수기호 8자이상20자이내)");
          throw new Error("올바른 형식을 입력해주세요");
        }
        break;

      // case 'nickName':
      //   const nickRegex = /^[A-Za-z0-9]{0,5}$/;
      //   if (!nickRegex.test(nickName)) {
      //     throw new Error("조건을 확인해주세요.");
      //   }
      //   break;

      case 'phoneNumber':
        const phoneRegex = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;
        if (!phoneRegex.test(phoneNumber)) {
          throw new Error("올바른 형식과 하이픈을 입력해주세요.");
        }
        break;

      case 'birthDate':
        const birthRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        const [year, month, day] = birthDate.split('-').map(Number);
        const date = new Date(year, month - 1, day);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (!birthRegex.test(birthDate)) {
          throw new Error(`올바른 형식 또는 하이픈을 입력해주세요.`);
        }
        // // 월과 일이 유효한지 체크
        else if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
          throw new Error("유효하지 않은 생년월일입니다.");
        }
        // 추가: 오늘 날짜 및 미래 날짜 검사
        else if (date >= today) {
          throw new Error("날짜를 다시 확인해주세요.");
        }
        break;
      case 'checkPassword':
        if (checkPassword !== password) {
          throw new Error("비밀번호가 일치하지 않습니다.")
        }
    }
  } else {
  }
}



