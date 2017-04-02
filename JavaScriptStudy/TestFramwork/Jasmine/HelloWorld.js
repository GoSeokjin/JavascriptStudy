function helloWorld() {
    return "Hello world";
}

describe("Hello World", function () {
    //it === spec 프로그램의 일부가 무엇을 해야하는지를 말해주는 자바스크립트 함수
    it("Say Hello", function () {
        //Matcher ===  helloWorld() 함수가 "Hello world!"와 같은지를 테스트
        expect(helloWorld()).toEqual("Hello world");
        expect(helloWorld()).toContain("world");

        /*
         자스민에는 많은 내장 매처들이 있습니다. toBeNull()은 변수가 null이기를 기대하고 toBeTruthy()는 어떤 값이 true이기를 기대합니다.
         expect(x).not.toEqual(y)는 동일하지 않다는 것을 확인해주는데
         .not 오퍼레이터를 사용했습니다. toEqual()은 동등성을 확인하는 반면에 toBe()는 정확히 같은 객체인지를 확인해 줍니다.

         출처 : https://blog.outsider.ne.kr/673
         */
    })
});