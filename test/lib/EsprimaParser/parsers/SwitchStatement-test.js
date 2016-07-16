// spec: https://github.com/estree/estree/blob/master/spec.md#switchstatement

describe('SwitchStatement tests', () => {
  let switchStatement

  beforeEach(() => {
    switchStatement = createAstNode('SwitchStatement', {
      discriminant: 'discriminant',
      cases: [
        createAstNode('SwitchCase1'),
        createAstNode('SwitchCase2'),
        createAstNode('SwitchCase3')
      ]
    })

    sandbox.stub(esprimaParser, 'parseNode', sandbox.spy(() => {
      return 'parsedDiscriminant'
    }))
    sandbox.stub(esprimaParser, 'parseSwitchCases', sandbox.spy(() => {
      return 'resultFromParseSwitchCases'
    }))
    sandbox.stub(esprimaParser, 'status', {
      unset: sandbox.spy()
    })
  })

  it('should call parseNode with discriminant', () => {
    esprimaParser.SwitchStatement(switchStatement)

    expect(
      esprimaParser.parseNode
        .calledWithExactly('discriminant')
    ).to.be.true
  })

  it('should call parseSwitchCases with cases and parsed discriminant', () => {
    esprimaParser.SwitchStatement(switchStatement)

    expect(
      esprimaParser.parseSwitchCases
        .calledWithExactly(switchStatement.cases, 'parsedDiscriminant')
    ).to.be.true
  })

  it('should call unset of esprimaParser status with \'break\'', () => {
    // switch should not unset return, and there is no continue statement in it
    esprimaParser.SwitchStatement(switchStatement)

    expect(
      esprimaParser.status.unset
        .calledWithExactly('break')
    ).to.be.true
  })
})
